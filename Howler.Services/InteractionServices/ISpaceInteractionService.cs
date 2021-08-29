// <copyright file="ISpaceInteractionService.cs" company="Howler Team">
// Copyright (c) Howler Team. All rights reserved.
// Licensed under the Server Side Public License.
// See LICENSE file in the project root for full license information.
// </copyright>
// <author>Cassandra A. Heart</author>

namespace Howler.Services.InteractionServices
{
    using System.Threading.Tasks;
    using Howler.Services.Models;
    using Howler.Services.Models.V1.Errors;
    using Howler.Services.Models.V1.Space;

    /// <summary>
    /// Defines the interaction boundaries with spaces and coordinates control.
    /// </summary>
    public interface ISpaceInteractionService
    {
        /// <summary>
        /// Retrieves a space by its identifier.
        /// </summary>
        /// <param name="spaceId">The space identifier.</param>
        /// <returns>
        /// Returns a <see cref="SpaceResponse"/> if found, null otherwise.
        /// </returns>
        SpaceResponse? GetSpaceBySpaceId(string spaceId);

        /// <summary>
        /// Creates a space.
        /// </summary>
        /// <param name="request">The request to create a space.</param>
        /// <returns>
        /// A completed
        /// <see cref="Either{ErrorResponse, SpaceResponse}"/>.
        /// </returns>
        Task<Either<ErrorResponse, SpaceResponse>> CreateSpaceAsync(
            CreateOrUpdateSpaceRequest request);

        /// <summary>
        /// Updates a space.
        /// </summary>
        /// <param name="request">The request to update a space.</param>
        /// <returns>
        /// A completed
        /// <see cref="Either{ValidationErrorResponse, SpaceResponse}"/>.
        /// </returns>
        Either<ErrorResponse, SpaceResponse?> UpdateSpace(
            CreateOrUpdateSpaceRequest request);

        /// <summary>
        /// Deletes a space.
        /// </summary>
        /// <param name="spaceId">The identifier of the space.</param>
        /// <returns>
        /// Returns null if successful, or an error.
        /// </returns>
        ErrorResponse? DeleteSpaceBySpaceId(string spaceId);
    }
}
