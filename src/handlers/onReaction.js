const onReaction = async (reaction, user) => {
  reaction = await reaction.partial ? reaction.fetch() : reaction
  user = await user.partial ? user.fetch() : user

  if (user.bot) return

  console.log(reaction, user)
}

export default onReaction