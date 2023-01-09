import { Action, Reducer } from 'redux';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as ethers from 'ethers';

import { MerkleAPIClient, Cast, User } from "../api/farcaster-js";


// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface FarcasterState {
    casts: Cast[];
    user: User | undefined;
    connection: MerkleAPIClient | undefined;
    isLoading: boolean;
    taggedCasts: Map<string, Cast[]>;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestConnectionAction {
    type: 'REQUEST_CONNECTION';
    wallet: ethers.Wallet;
}

interface RequestingConnectionAction {
    type: 'REQUESTING_CONNECTION';
    wallet: ethers.Wallet;
}

interface ReconnectingAction {
    type: 'RECONNECTING';
}

interface FailedConnectionAction {
    type: 'FAILED_CONNECTION';
    error: string;
}

interface ReceiveConnectionAction {
    type: 'RECEIVE_CONNECTION';
    connection: MerkleAPIClient;
    user: User;
    casts: Cast[];
    taggedCasts: Map<string, Cast[]>;
}

interface SendCastAction {
    type: 'SEND_CAST';
    message: string;
    inReplyTo?: Cast | undefined;
}

interface SubmittingCastAction {
    type: 'SUBMITTING_CAST';
    message: string;
}

interface SubmittedCastAction {
    type: 'SUBMITTED_CAST';
    casts: Cast[];
    taggedCasts: Map<string, Cast[]>;
}

interface FailedCastAction {
    type: 'FAILED_CAST';
    message: string;
}

interface ReloadCastsAction {
    type: 'RELOAD_CASTS';
}

interface ReloadingCastsAction {
    type: 'RELOADING_CASTS';
}

interface ReloadedCastsAction {
    type: 'RELOADED_CASTS';
    casts: Cast[];
    taggedCasts: Map<string, Cast[]>;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestConnectionAction | RequestingConnectionAction | ReconnectingAction | ReceiveConnectionAction | FailedConnectionAction | SendCastAction | SubmittingCastAction | SubmittedCastAction | FailedCastAction | ReloadCastsAction | ReloadingCastsAction | ReloadedCastsAction;

// ----------------
// SAGAS - The declarative transaction flows for interacting with the store.

async function grabPages(client: MerkleAPIClient) {
    let frc = client.fetchRecentCasts();
    let count = 0;
    let casts: Cast[] = [];
    let taggedCasts = new Map<string, Cast[]>();

    for await (const cast of frc) {
        casts.unshift(cast);
        count++;
        let matches = cast.text.match(/#[a-z0-9\-_.]+/i);
        if (matches) {
            for (let match of matches) {
                if (!taggedCasts.has(match)) {
                    taggedCasts.set(match, []);
                }
                console.log(match +": " + cast.text);
                taggedCasts.get(match)!.unshift(cast);
            }
        }
        if (count > 500) break;
    }

    return { casts, taggedCasts };
}

async function publishCast(client: MerkleAPIClient, message: string, inReplyTo?: Cast | undefined) {
    try {
        await client.publishCast(message, inReplyTo);
    } catch (e) {
        console.log(e);
    }
}

async function fetchCurrentUser(client: MerkleAPIClient) {
    try {
        return await client.fetchCurrentUser();
    } catch (e) {
        console.log(e);
    }
}

function* handleConnectionRequest(request: RequestConnectionAction) {
    yield put({type: 'REQUESTING_CONNECTION', wallet: request.wallet});
    
    try {
        let state = new MerkleAPIClient(request.wallet);
        let user: User = yield call(fetchCurrentUser, state);
        let pages: { casts: Cast[], taggedCasts: Map<string, Cast[]> } = yield call(grabPages, state);
        yield put({type: 'RECEIVE_CONNECTION', connection: state, user: user, casts: pages.casts, taggedCasts: pages.taggedCasts });
    } catch (e) {
        yield put({type: 'FAILED_CONNECTION', wallet: request.wallet, error: e });
    }
}

function* handleSubmitCast(request: SendCastAction) {
    let state: FarcasterState = yield select(s => s.farcaster as FarcasterState);
    
    try {
        yield call(publishCast, state.connection, request.message, request.inReplyTo);
        let pages: { casts: Cast[], taggedCasts: Map<string, Cast[]> } = yield call(grabPages, state.connection!);
        yield put({type: 'SUBMITTED_CAST', casts: pages.casts, taggedCasts: pages.taggedCasts });
    } catch (e) {
        yield put({type: 'FAILED_CAST', message: request.message, error: e });
    }
}

function* handleReloadCasts(request: ReloadCastsAction) {
    let state: FarcasterState = yield select(s => s.farcaster as FarcasterState);
    
    try {
        let pages: { casts: Cast[], taggedCasts: Map<string, Cast[]> } = yield call(grabPages, state.connection!);
        yield put({type: 'RELOADED_CASTS', casts: pages.casts, taggedCasts: pages.taggedCasts });
    } catch (e) {
        yield put({type: 'FAILED_CONNECTION', error: e });
    }
}


export const farcasterSagas = {
    watchConnectionRequests: function*() {
        yield takeLeading('REQUEST_CONNECTION', handleConnectionRequest)
        yield takeLeading('SEND_CAST', handleSubmitCast)
        yield takeLeading('RELOAD_CASTS', handleReloadCasts)
    }
};

// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestConnection: (wallet: ethers.Wallet) => ({ type: 'REQUEST_CONNECTION', wallet } as RequestConnectionAction),
    reloadCasts: () => ({ type: 'RELOAD_CASTS' } as ReloadCastsAction),
    submitCast: (message: string, inReplyTo?: Cast | undefined) => ({ type: 'SEND_CAST', message, inReplyTo } as SendCastAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: FarcasterState = { casts: [], taggedCasts: new Map<string, Cast[]>(), user: undefined, isLoading: false, connection: undefined };

export const reducer: Reducer<FarcasterState> = (state: FarcasterState | undefined, incomingAction: Action): FarcasterState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUESTING_CONNECTION':
            return {
                ...state,
                isLoading: true,
            };
        case 'RECEIVE_CONNECTION':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            const receiveConnection = action as ReceiveConnectionAction;
            return {
                ...state,
                isLoading: false,
                connection: receiveConnection.connection,
                user: receiveConnection.user,
                casts: receiveConnection.casts,
                taggedCasts: receiveConnection.taggedCasts,
            };
        case 'FAILED_CONNECTION':
            return {
                ...state,
                isLoading: true,
                connection: undefined,
            }
        case 'SUBMITTING_CAST':
            return {
                ...state,
            };
        case 'SUBMITTED_CAST':
            const submittedCast = action as SubmittedCastAction;
            return {
                ...state,
                casts: submittedCast.casts,
                taggedCasts: submittedCast.taggedCasts,
            };
        case 'FAILED_CAST':
            return {
                ...state,
            };
        case 'REQUEST_CONNECTION':
            return {
                ...state,
            };
        case 'SEND_CAST':
            return {
                ...state,
            };
        case 'RELOAD_CASTS':
            return {
                ...state,
            }
        case 'RELOADING_CASTS':
            return {
                ...state,
            }
        case 'RELOADED_CASTS':
            const reloadedCasts = action as ReloadedCastsAction;
            return {
                ...state,
                casts: reloadedCasts.casts,
                taggedCasts: reloadedCasts.taggedCasts,
            }
    }

    return state;
};
