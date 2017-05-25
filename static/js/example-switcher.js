(function init (document) {
  var links = document.querySelectorAll('[data-example-show]')
  forEachNode(links, function (node) {
    node.addEventListener('click', onClick, false)
  })

  function onClick (evt) {
    evt.preventDefault()
    var link = evt.currentTarget
    var showKey = link.dataset.exampleShow

    var links = document.querySelectorAll('[data-example-show]')
    forEachNode(links, function (node) {
      var key = node.dataset.exampleShow
      console.log('link', key, key === showKey)
      node.classList.toggle('active', key === showKey)
    })

    var nodes = document.querySelectorAll('[data-example]')
    forEachNode(nodes, function (node) {
      var key = node.dataset.example
      console.log('example', key, key !== showKey)
      node.classList.toggle('dn', key !== showKey)
    })
  }

  function forEachNode (nodes, fn) { [].forEach.call(nodes, fn) }
})(document)
