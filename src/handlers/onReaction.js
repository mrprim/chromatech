const onReaction = async (reaction, user) => {
  reaction = await reaction.partial ? reaction.fetch() : reaction
  user = await user.partial ? user.fetch() : user
}

export default onReaction