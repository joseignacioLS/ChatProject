const clearAllIntervals = () => {
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER)

  // Clear any timeout/interval up to that id
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i)
  }
}

const resetChatPosition = () => {
  try {
    const div = document.querySelector(".conversation")
    div.scrollTop = div.scrollHeight
  } catch (err) {}
}

export { clearAllIntervals, resetChatPosition }
