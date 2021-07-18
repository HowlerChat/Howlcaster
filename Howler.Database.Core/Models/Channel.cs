// <copyright file="Channel.cs" company="Howler Team">
// Copyright (c) Howler Team. All rights reserved.
// Licensed under the Server Side Public License.
// See LICENSE file in the project root for full license information.
// </copyright>
// <author>Cassandra A. Heart</author>

namespace Howler.Database.Core.Models
{
    using System;
    using Cassandra.Mapping.Attributes;

    /// <summary>
    /// The Channel data model.
    /// </summary>
    [Table("howler.channels")]
    public class Channel : IEntity<Tuple<string, string>>
    {
        /// <summary>
        /// Gets or sets the channel identifier.
        /// </summary>
        [Column("channel_id")]
        public string? ChannelId { get; set; }

        /// <summary>
        /// Gets or sets the space identifier. Set to "direct" for direct
        /// or group messaging.
        /// </summary>
        [Column("space_id")]
        public string? SpaceId { get; set; }

        /// <summary>
        /// Gets or sets the channel name.
        /// </summary>
        [Column("channel_name")]
        public string? ChannelName { get; set; }

        /// <summary>
        /// Gets or sets the optional channel topic.
        /// </summary>
        [Column("channel_topic")]
        public string? ChannelTopic { get; set; }

        /// <summary>
        /// Gets or sets the channel creator's member id.
        /// </summary>
        [Column("member_id")]
        public string? MemberId { get; set; }

#pragma warning disable SA1011
        /// <summary>
        /// Gets or sets the policy document.
        /// </summary>
        [Column("channel_policy")]
        public byte[]? ChannelPolicy { get; set; }
#pragma warning restore SA1011

        /// <summary>
        /// Gets or sets the channel's optional encryption method.
        /// </summary>
        [Column("encryption_method")]
        public string? EncryptionMethod { get; set; }

        /// <summary>
        /// Gets or sets the space's creation date.
        /// </summary>
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets the space's last modified date.
        /// </summary>
        [Column("modified_date")]
        public DateTime ModifiedDate { get; set; }

        /// <inheritdoc/>
        public Tuple<string, string> Key
        {
            get => new Tuple<string, string>(this.SpaceId!, this.ChannelId!);
        }
    }
}