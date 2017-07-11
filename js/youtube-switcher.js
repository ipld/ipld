(function init (document) {
  var previewLinks = document.querySelectorAll('[data-youtube-switcher]')
  ;[].forEach.call(previewLinks, function (node) {
    node.addEventListener('click', onPreviewClick, false)
  })

  function onPreviewClick (evt) {
    evt.preventDefault()
    var preview = evt.currentTarget
    var player = document.getElementById('active-video')
    updatePlayer(player, getYoutubeId(preview), getCaption(preview))
    updatePreview(preview, getYoutubeId(player), getCaption(player))
  }

  function updatePlayer (node, youtubeId, caption) {
    var newNode = node.cloneNode(true)
    setYoutubeId(newNode, youtubeId)
    setCaption(newNode, caption)
    setAttr(newNode, 'iframe', 'src', '')
    node.parentNode.replaceChild(newNode, node)
    setAttr(newNode, 'iframe', 'src', 'https://www.youtube.com/embed/' + youtubeId + '?autoplay=1&showinfo=0')
  }

  function updatePreview (node, youtubeId, caption) {
    var newNode = node.cloneNode(true)
    setYoutubeId(newNode, youtubeId)
    setCaption(newNode, caption)
    setAttr(newNode, 'img', 'src', 'https://img.youtube.com/vi/' + youtubeId + '/mqdefault.jpg')
    newNode.setAttribute('href', 'https://www.youtube.com/watch?v=' + youtubeId)
    newNode.addEventListener('click', onPreviewClick, false)
    node.parentNode.replaceChild(newNode, node)
  }

  function getCaption (node) {
    return node.getElementsByTagName('figcaption')[0].textContent
  }

  function setCaption (node, caption) {
    node.getElementsByTagName('figcaption')[0].textContent = caption
  }

  function getYoutubeId (node) {
    return node.dataset.youtubeId
  }

  function setYoutubeId (node, youtubeId) {
    node.dataset.youtubeId = youtubeId
  }

  function setAttr (node, tag, name, value) {
    node.getElementsByTagName(tag)[0].setAttribute(name, value)
  }
})(document)
