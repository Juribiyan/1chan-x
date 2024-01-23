// ==UserScript==
// @name         1chan-X
// @namespace    https://ochan.ru/userjs/
// @version      1.9.1
// @description  UX extension for 1chan.su and the likes
// @updateURL    https://juribiyan.github.io/1chan-x/src/1chan-x.meta.js
// @downloadURL  https://juribiyan.github.io/1chan-x/src/1chan-x.user.js
// @author       Snivy
// @match        https://1chan.su/*
// @match        https://1chan.ca/*
// @match        https://1chan.life/*
// @match        https://1chan.top/*
// @match        https://1chan.plus/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.deleteValue
// @run-at       document-end
// @icon         https://juribiyan.github.io/1chan-x/icon.png
// ==/UserScript==

// const cssBaseURL = `https://1chan-x/css`      // dev
const cssBaseURL = `https://juribiyan.github.io/1chan-x/css` // prod

const UPLOAD_API = 'https://catbox.moe/user/api.php'

// ========================== General utilities and prototype extensions ==========================

const injector = {
  inject: function(alias, css, position="beforeend") {
  var id = `injector:${alias}`
  var existing = document.getElementById(id)
  if(existing) {
    existing.innerHTML = css
    return
  }
  var head = document.head || document.getElementsByTagName('head')[0]
  head.insertAdjacentHTML(position, `<style type="text/css" id="${id}">${css}</style>`)
  },
  remove: function(alias) {
  var id = `injector:${alias}`
  var style = document.getElementById(id)
  if (style) {
    var head = document.head || document.getElementsByTagName('head')[0]
    if(head)
      head.removeChild(document.getElementById(id))
    }
  }
}
// Shorthands aka jQuery for the poor
const $ = sel => document.querySelector(sel)
const $$ = (sel, context=document) => Array.from(context.querySelectorAll(sel))
window.Element.prototype._$ = function(sel) { // barbaric yet effective
  return this.querySelector(sel)
}
window.Element.prototype._$$ = function(sel) {
  return $$(sel, this)
}

// Insert adjacent HTML and immediately return the inserted element
window.Element.prototype._ins = function(position, html, returnInserted=false) {
  this.insertAdjacentHTML(position, html)
  if (!returnInserted) return;
  position = position.toLowerCase()
  if (position == 'afterbegin')
    return this.firstElementChild
  else if (position == 'beforeend')
    return this.lastElementChild
  else if (position == 'beforebegin')
    return this.previousElementSibling
  else
    return this.nextElementSibling
}

window.EventTarget.prototype.delegateEventListener = function(types, targetSelectors, listener, options) {
  if (! (targetSelectors instanceof Array))
    targetSelectors = [targetSelectors]
  this.addMultiEventListener(types, ev => {
    targetSelectors.some(selector => {
      if (ev.target.matches(selector)) {
        listener.bind(ev.target)(ev)
        return true
      }
    })
  }, options)
}
window.EventTarget.prototype.addMultiEventListener = function(types, listener, options) {
  if (! (types instanceof Array))
    types = types.split(' ')
  types.forEach(type => {
    this.addEventListener(type, ev => {
      listener.bind(ev.target)(ev)
    }, options)
  })
}

;[window.Element.prototype, window.Text.prototype].forEach(e => {
  e.matches || (e.matches=e.matchesSelector || function(selector) {
    var matches = document.querySelectorAll(selector)
    return Array.prototype.some.call(matches, e => {
       return e === this
    })
  })
  e.findParent = function(selector) {
    let node = this
    while(node && !node.matches(selector)) {
      node = node.parentNode
      if (! node.matches) return null;
    }
    return node
  }
})

function LS_getJSON(key, prefix="x1") {
  key = `${prefix}-${key}`
  let v = localStorage[key]
  if (!v) return null;
  try {
    let data = JSON.parse(v)
    return data
  } catch(e) {
    localStorage.removeItem(key)
    console.warn(`Deleted "${key}" from local storage due to wrong format`)
  }
}

function LS_saveJSON(key, data, prefix="x1") {
  localStorage[`${prefix}-${key}`] = JSON.stringify(data)
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHtml(unsafe) {
  return unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;")
}

function tryDecodeURI(uri) {
  try {
    return decodeURI(uri)
  } catch(e) {
    return false
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase()
    + str.slice(1)
}

/*function fileToURIComponent(file) {return new Promise((resolve, reject) => {
  let fr = new FileReader()
  fr.onload = (event) => resolve(encodeURIComponent(event.target.result))
  fr.onerror = reject
  fr.readAsDataURL(file)
})}*/


// =============================== Greasemonkey utils and polyfills ===============================
// Greasemonkey switched to a fully async API since v.4, yet older versions must be supported

if (typeof GM == 'undefined') { this.GM = {info: GM_info} }

Object.entries({
  'GM_getValue': 'getValue',
  'GM_setValue': 'setValue',
  'GM_deleteValue': 'deleteValue',
  'GM_xmlhttpRequest': 'xmlHttpRequest'
}).forEach(([oldKey, newKey]) => {
  let old = this[oldKey]
  if (old && typeof GM[newKey] == 'undefined') {
    GM[newKey] = function(...args) {
      return new Promise((resolve, reject) => {
        try {
          resolve(old.apply(this, args))
        } catch(e) {
          reject(e)
        }
      })
    }
  }
})

async function GM_getJSON(key) {
  let v = await GM.getValue(key)
  if (!v) return null;
  try {
    let data = JSON.parse(v)
    return data
  } catch(e) {
    GM.deleteValue(key)
    console.warn(`Deleted "${key}" from GM storage due to wrong format`)
  }
}


// ======================================== Site settings =========================================

const siteSpecific = {
  init: function() {
    this.generalize()
    let host = '_' + document.location.hostname.replace(/\./g, '_').toLowerCase()
    this.current = this.sites?.[host]
    if (this.current.css) {
      injector.inject('x1'+host, this.current.css)
    }
  },
  generalize: function() {
    this.sites._1chan_lol = this.sites._1chan_su,
  },
  sites: {
    _1chan_su: {
      imgSvc: {supported: ['imgur', 'catbox', 'generic']},
      css: `
        .l-content-wrap {
          border-radius: 23px 23px 8px 8px;
        }
      `,
      features: ['voice'],
      darkTheme: {
        logo: {
          src: '/img/ogol.png'
        }
      }
    },
    _1chan_ca: {
      imgSvc: {
        supported: ['imgur'],
        imgur: { key: '' }
      },
      darkTheme: {
        logo: {
          src: '/img/logo_omsk.png'
        }
      }
    },
    _1chan_life: {
      imgSvc: {supported: ['imgur', 'catbox', 'generic']},
      css: `
        .b-blog-panel_b-all span::before {
          content: '';
          height: 16px;
          width: 16px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          background-image: url(/ico/favorites-false.png);
        }
      `,
      darkTheme: {
        logo: {
          src: false, // Keep the default logo
          css: `filter: invert(1) hue-rotate(200deg) brightness(2)`
        }
      }
    },
    _1chan_plus: {
      imgSvc: {supported: ['imgur', 'catbox']},
      css: `
        .b-blog-panel_b-all span::before {
          content: '';
          height: 16px;
          width: 16px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          background-image: url(/ico/favorites-false.png);
        }
      `,
      darkTheme: {
        logo: {
          src: false, // Keep the default logo
          css: `filter: invert(1) hue-rotate(180deg) brightness(1.25)`
        }
      }
    },
    _1chan_top: {
      imgSvc: {
        supported: ['imgur', 'catbox', 'generic'],
        imgur: { key: '' },
        generic: {
          supportedHosts: [
            'cocaine.ninja',
            'dmca.gripe',
            'vgy.me',
            'fuwafuwa.moe',
            'lewd.host'
          ]
        },
        catbox: {
          key: false,
          supportedHosts: ['catbox.moe'],
          likeGeneric: true,
          getCompactCode: code =>
            code.match(/^(?:https?\:\/\/)?files\.catbox\.moe\/([0-9a-z\.]+)$/i)[1]
        }
      },
      css: `
        .l-content-wrap {
          border-radius: 23px 23px 8px 8px;
        }
        .b-blog-panel_b-all a::before {
          content: '';
          height: 16px;
          width: 16px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          background-image: url(/ico/favorites-false.png);
        }
        .b-blog-panel ul {
            display: flex;
            width: calc(100% - 16px);
        }
      `,
      darkTheme: {
        noService: true, // Following a service link doesn't do shit
        logo: {
          src: false, // Keep the default logo
          css: `filter: invert(1) hue-rotate(325deg) brightness(1.25)`
        }
      },
      normalLogoSrc: '/img/logo_top.png' // Yeah I'm sure it was absolutely necessary to break the consistency
    }
  }
}


// ======================================= State management =======================================

const app = {
  state: 'undefined'
}

function determineState() {
  if ($('.b-board-header')) {
    if ($('.b-comment-form'))
      return 'thread'
    else
      return 'board'
  }
  if ($('.b-blog-entry')) {
    if ($('.l-comments-wrap')) 
      return 'newsentry';
    else
      return 'news';
  }
  if ($('.b-chat')) 
    return 'chat';
  if ($('#blog_form')) 
    return 'form';
}

const stateHandlers = {}

stateHandlers.news = 
stateHandlers.newsentry = 
stateHandlers.board = 
stateHandlers.thread = 
async() => {
  await formAugmentation.init()
  comments.init()
}

stateHandlers.form = async () => {
  await formAugmentation.init()
}


// ================================== Main functional components ==================================

const comments = {
  init: function(state=app.state) {
    this.boardPrefix = (state == 'thread' || state == 'board')
      ? (document.location.pathname.split('/')?.[1] + '_')
      : ''
    
    $$('.b-blog-entry').forEach(post => {
      this.processComment(post)
    })

    if (state == 'newsentry' || state == 'thread' || state == 'board') {
      $$('.b-comment')
      .reverse() // iterate replies in reverse order for in-place reply map generation
      .forEach(com => this.processComment(com))

      $$('div[id^="placeholder_comment"]').forEach(placeholder => {
        new MutationObserver(this.observe.bind(this))
        .observe(placeholder, {childList: true})
      })
    }

    if (['newsentry', 'thread', 'board', 'news'].includes(state)) {
      this.setupPreviews()
    }

    this.setupSelection()
  },
  observe: function(mutationList) {
    for (const mutation of mutationList) {
      if (mutation.type == 'childList') {
        [].filter.call(mutation.addedNodes, com => com.classList?.contains('b-comment'))
        .forEach(com => this.processComment(com, true))
      }
    }
  },
  replyMap: {},
  processComment: function(com, isNew=false) {
    let type = com.classList.contains('b-comment')
      ? 'comment'
      : 'post'
    , n = com.id.match(/_([0-9]+)$/)[1]

    // find references to previous replies
    com._$$('.js-cross-link').forEach(ref => {
      let rn = ref.innerText.slice(2) // remove ">>"
      if (!this.replyMap?.[rn]?.includes(n)) {
        this.replyMap[rn] = [...(this.replyMap?.[rn] || []), n]
        if (isNew) {
          let rc = $(`#comment_${this.boardPrefix}${rn}`)
          if (rc) {
            this.addReplyMap(rc, [n], rn)
          }
        }
      }
    })
    // find self in reply map
    if (this.replyMap?.[n]) {
      this.addReplyMap(com, this.replyMap[n], n)
    }

    // Add hide/unhide buttons
    if (hiddenItems.checkPost(com)) {
      com.classList.add('x1-post-hidden', 'x1-hidden-by-id')
    }
    let eye = `<img src="/ico/oh-my-eyes.png" width="16" height="16">`
    , huh = `<button type="button" class="x1-transparent-btn x1-hideunhide x1-hide-post" title="Скрыть">${eye}</button>
      <button type="button" class="x1-transparent-btn x1-hideunhide x1-unhide-post" title="Раскрыть">${eye}</button>`
    if (type == 'comment') {
      com._$('.b-comment_b-info')._ins('beforeend', huh)
    }
    else {
      com._$('.js-hide-link')?.remove()
      com._$('.js-favorite-button')._ins('afterend', huh)
      // Convert native hide into userscript hide
      if (com.classList.contains('m-hide')) {
        com.classList.remove('m-hide')
        hiddenItems.addPost(com, true)
      }
    }
    com._$('.x1-transparent-btn.x1-hide-post').addEventListener('click', () => hiddenItems.addPost(com))
    com._$('.x1-transparent-btn.x1-unhide-post').addEventListener('click', () => hiddenItems.removePost(com))

    // Previewing hidden posts
    let hiddenPreviewing = ev => {
      if (ev.type == 'mouseenter') {
        if (com.classList.contains('x1-post-hidden')) {
          com.classList.add('x1-hidden-post-preview')
        }
      }
      if (ev.type == 'mouseleave') {
        if (com.classList.contains('x1-hidden-post-preview')) {
          com.classList.remove('x1-hidden-post-preview')
        }
      }
      if (type == 'post' && ev.type == 'click' && com.classList.contains('x1-post-hidden')) {
        ev.preventDefault()
        ev.stopPropagation()
        hiddenItems.removePost(com)
        com.classList.remove('x1-hidden-post-preview')
      }
    }
    if (type == 'post') {
      com._$('.b-blog-entry_b-header a:last-of-type')
      .addMultiEventListener(['mouseenter', 'mouseleave', 'click'], hiddenPreviewing)
    }
    else {
      com._$$('.x1-hideunhide').forEach(e => 
        e.addMultiEventListener(['mouseenter', 'mouseleave', 'click'], hiddenPreviewing) )
    }

    // Text selection in post for hiding
    com._$(type=="post" ? '.b-blog-entry_b-header' : '.b-comment_b-info')
    ._ins('beforeend', `<button type="button" class="x1-btn x1-hide-selected-text" title="Скрыть выделенный текст">Скрыть</button>`, true)
    .addEventListener('click', () => {
      if (this.selection) {
        hiddenItems.addText(this.selection)
        com.classList.remove('x1-has-selected-text')
      }
    })

    this.processBody(com, n, type)
  },
  processBody: async function(com, n, type) {
    let body = com._$(`.b-${type=='comment' ? 'comment' : 'blog-entry'}_b-body`)
    if (!body) {
      console.warn('No body?', com)
      return;
    }
    hiddenItems.scanPost(com, body, true)

    this.replaceSmileys(body)

    this.decodeAudio(body)

    ;[...body._$$('img:not(.smiley):not(.x1-warning)'), ...body._$$('video')].forEach(img => {
      this.processImage(img, com)
    })

    // Search for sus links
    body._$$('a').forEach(a => {
      let sus = false, href = tryDecodeURI(a.href) || a.href
      if (a.innerText) {
        let spl = a.innerText.trim().split('…')
        , doubleShortened = (spl.length == 3)
        , [start, end] = [...spl, '']
        sus = ( // Check if the link is not misleading:
          (
            start.indexOf('http') == 0 // It looks like a raw link
            && // but at the same time
            ( // the start of its description doesn't match the start of its URL:
              href.indexOf(start) != 0 
              || // or
              (
                end // the end/middle of its description (if the link is shortened)
                &&   // doesn't match the end/middle of its URL:
                !(doubleShortened
                  ? ~href.indexOf(end) // (double-shortened links are kinda sussy but ok...)
                  : (href.indexOf(end) + end.length == href.length)
                )
              )
            )
          )
          || // OR:
          ( // It looks like a safe internal link
            start.indexOf('Читать дальше') == 0
            && // but it really isn't:
            href.indexOf(document.location.origin) != 0
          )
        )
      }
      else sus = a._$('img.smiley') && 'smiley' // smiles that are links are also sus
      if (sus) {
        a._ins('afterbegin', `<img class="x1-warning${sus=='smiley' ? ' x1-link-sus-with-smiley' : ''}"  src="/ico/warning.png">`)
        a.classList.add('x1-link-sus')
        a.title = "Подозрительная ссылка"
      }
    })
  },
  decodeAudio: function(postBody) {
    postBody._$$('audio').forEach(audio => {
      let url = new URL(audio.src)
      if (url.hostname == 'tts.voicetech.yandex.net') {
        let text = decodeURIComponent(url.search)?.match(/^\?text=(.+?)&/)?.[1]
        if (text) {
          audio._ins('afterend', `<details class="x1-audio-content">
            <summary class="x1-btn" title="Расшифровать аудио">Aa</summary>
            <div>${text}</div>
          </details>`)
        }
      }
    })
  },
  // Replace codes with samileys which may be present on server, falling back if not
  replaceSmileys: function(postBody) {
    let walker = document.createTreeWalker(postBody, NodeFilter.SHOW_TEXT, null, false)
    let node, nodes = [];
    while(node = walker.nextNode()) {
      if (node.textContent)
        nodes.push(node)
    }
    nodes.forEach(node => {
      let r = node.textContent.replace(/\:([0-9a-z_]+)\:/ig, (code, s) => {
        let ext = formAugmentation.smile_map[s]
        if (ext) {
          return `<img class="smiley" src="/img/${s}.${ext}" alt="${code}">`
        }
        else return code
      })
      if (r != node.textContent) {
        let span = document.createElement('span')
        span.style.display = "contents"
        span.innerHTML = r
        span._$('img').addEventListener('error', function() {
          span.innerHTML = this.alt
        })
        node.replaceWith(span)
      }
    })
  },
  processImage: async function(img, post) {
    let imgData = await this.getImgData(img)
    if (!imgData) return; // some images like youtube previews won't be parsed
    let {
      link, 
      linkURL, imgURL, 
      svc, code, 
      internalThumb, 
      sameURL,
      linkSus,
      thumb,
      hideByImg, hideByLink
    } = imgData

    if (linkSus) {
      link._ins('beforeend', `<img class="x1-warning" src="/ico/warning.png">`)
      link.classList.add('x1-imglink-sus')
      link.title = "Подозрительная ссылка"
    }
    // Add snippet buttons
    if (svc) {
      link.dataset.svcCode = `${svc}:${code}`
      let added = formAugmentation.findImageSnippet(svc, code)
      if (added) {
        link.classList.add('x1-snippet-added')
        // add a thumbnail
        if (thumb) {
          added.thumb = thumb
          formAugmentation.saveImgSnippets()
        }
      }
      link._ins('afterbegin', `<div class="x1-floating-btn-group x1-addremove-group">
        <div class="x1-floating-btn x1-snippet-add" title="Добавить в коллекцию"></div>
        <div class="x1-floating-btn x1-snippet-delete" title="Удалить из коллекции"></div>
      </div>`)
      link._$('.x1-snippet-add').addEventListener('click', ev => {
        ev.stopPropagation()
        ev.preventDefault()
        formAugmentation.addImageSnippet({
          service: svc,
          code: code,
          thumb: thumb
        })
      })
      link._$('.x1-snippet-delete').addEventListener('click', ev => {
        ev.stopPropagation()
        ev.preventDefault()
        formAugmentation.deleteImageSnippet(svc, code)
      })
    }
    // Check against blacklist
    if (hiddenItems.isImgHidden(link, hideByImg, hideByLink) && !hiddenItems.isUnhidden(post)) {
      post.classList.add('x1-post-hidden', 'x1-hidden-by-image')
    }
    // Add hide/unhide buttons
    link._ins('afterbegin', 
      `<div class="x1-floating-btn-group x1-hideunhide-group">
        <div class="x1-floating-btn x1-snippet-collapse x1-imglink-hideunhide x1-hideby x1-by-image" title="Скрывать посты по этой картинке"></div>
        <div class="x1-floating-btn x1-snippet-uncollapse x1-imglink-hideunhide x1-unhideby x1-by-image" title="Не скрывать посты по этой картинке"></div>` +
        (hideByLink 
          ? `<div class="x1-floating-btn x1-snippet-collapse x1-imglink-hideunhide x1-hideby x1-by-link" title="Скрывать посты по этой ссылке"></div>
            <div class="x1-floating-btn x1-snippet-uncollapse x1-imglink-hideunhide x1-unhideby x1-by-link" title="Некрывать посты по этой ссылке"></div>` 
          : '') +
    `</div>`)
    link._$$('.x1-imglink-hideunhide').forEach(link => link.addEventListener('click', ev => {
      ev.stopPropagation()
      ev.preventDefault()
      let item = link.classList.contains('x1-by-image') ? hideByImg : hideByLink
      hiddenItems[(link.classList.contains('x1-hideby') ? 'add' : 'remove') +
        (link.classList.contains('x1-by-image') ? 'Image' : 'Text')](item)
    }))
  },
  getImgData: async function(img) {
    // refer to /util/imglink_parsing_logic.xlsx
    let link = img.parentElement
    if (link.tagName != 'A') return;
    link.classList.add('x1-image-link')
    let linkURL = new URL(link.href)
    , imgURL = new URL(img.src)
    , [svc, code] = await formAugmentation.parseLink(link.href)
    , [iSvc, iCode] = await formAugmentation.parseLink(img.src)
    , internalThumb = (imgURL.host == document.location.host)
    , sameURL = (svc && iSvc == svc && iCode == code)
    , linkSus = (!sameURL && (!svc || !internalThumb) && linkURL.host != document.location.host)
    , thumb = (svc && internalThumb) && img.src
    , hideByImg = internalThumb ? link.href : img.src
    , hideByLink = (linkSus && !internalThumb) && link.href
    if (!(svc && (sameURL || internalThumb))) {
      [svc, code] = [iSvc, iCode]
    }
    return {
      link, 
      linkURL, imgURL, 
      svc, code, 
      internalThumb, 
      sameURL,
      linkSus,
      thumb,
      hideByImg, hideByLink
    }
  },
  addReplyMap: function(com, ids, selfID) {
    let existing = com._$('.x1-reply-map')
    let content = ids.map(id => `<a href="#${id}" class="x1-cross-link">&gt;&gt${id}</a>`).join(', ')
    if (existing) {
      existing.innerHTML += ','+content
    }
    else {
      let replyMap = `<div id="x1-rm-${selfID}" class="x1-reply-map">Ответы: ${content}</div>`
      , postInfo = com._$('.b-blog-entry_b-info')
      if (postInfo) {
        postInfo._ins('beforeBegin', replyMap)
      }
      else {
        com._ins('beforeEnd', replyMap)
      }
    }
  },
  setupPreviews: function() {
    let boardPrefix = (app.state == 'thread' || app.state == 'board')
      ? (document.location.pathname.split('/')?.[1] + '_')
      : ''
    , self = this
    document.body.delegateEventListener(['mouseenter', 'mouseleave'], ['.x1-comment-preview .js-cross-link', '.x1-cross-link', '.x1-comment-preview', '.b-blog-entry_b-info_b-link'], async function(ev) {
      let isLink = !this.classList.contains('x1-comment-preview')
      , link = isLink ? this : this?._boundLink
      , preview = isLink ? this?._boundPreview : this
      , viewLastComment = false
      if (this.classList.contains('b-blog-entry_b-info_b-link')) {
        if (app.state != 'news') return false;
        viewLastComment = this._$('a')?.href?.match(/res\/([\d]+)/)?.[1]
        if (!viewLastComment) return false;
      }
      if (ev.type == 'mouseenter') {
        if (!preview) { // Create preview
          let n = this.innerText.slice(2)
          , refCom = viewLastComment
            ? await self.getLastComment(viewLastComment)
            : $(`#comment_${boardPrefix}${n}`)
          if (refCom) {
            let top = link.offsetParent.offsetTop + link.offsetTop + link.offsetHeight - 4
            , lr = viewLastComment
              ? `right: ${window.innerWidth - (link.offsetParent.offsetLeft + link.offsetParent.offsetWidth)}px`
              : `left: ${link.offsetParent.offsetLeft + link.offsetLeft}px`
            preview = document.body._ins('beforeend',
              `<div class="b-comment m-tip x1-comment-preview"
              style="top: ${top}px; ${lr}; transform: scaleY(0);">
              ${refCom.innerHTML}</div>`, true)
            setTimeout(() => preview.style.transform = '', 50)
            // cross-reference link and preview
            preview._boundLink = link
            link._boundPreview = preview
            // cross-reference stacked previews
            let parent = link.findParent('.b-comment')
            if (parent?.classList.contains('m-tip')) {
              parent._childPreview = preview
              preview._parentPreview = parent
            }
          }
        }
        else { // Save previews from exiting
          while (preview) {
            clearTimeout(preview?._exitTimeout)
            preview._exitTimeout = null
            preview = preview?._parentPreview
          }
        }
      }
      else { // Mouseleave
        while (preview) { // Schedule preview exiting
          let p = preview, l = preview?._boundLink
          if(! preview._exitTimeout) {
            preview._exitTimeout = setTimeout(() => {
              p._exitTimeout = null
              p.style.transform = "scaleY(0)"
              setTimeout(() => p.remove(), 200)
              if (l) {
                l._boundPreview = null
              }
            }, 200)
          }
          preview = isLink ? p?._childPreview : p?._parentPreview
        }
      }
    }, {capture: true})
  },
  getLastComment: async function(post) {
    let res = await fetch(document.location.origin + `/news/res/${post}/`)
    if (!res?.ok) return false;
    let html = await res.text()
    if (!html) return false;
    let dom = Range.prototype.createContextualFragment.bind(document.createRange())(html)
    return Array.from(dom.querySelectorAll('.b-comment')).reverse()?.[0]
  },
  setupSelection: function() {
    let debounce = null
    document.addEventListener('selectionchange', () => {
      this.selection = ''
      if (debounce)
        clearTimeout(debounce)
      debounce = setTimeout(() => {
        this.handleSelection()
      }, 200)
    })
  },
  selection: '',
  handleSelection: function() {
    let sel = window.getSelection()
    $$('.x1-has-selected-text').forEach(e => e.classList.remove('x1-has-selected-text'))
    if (sel.isCollapsed) return;
    let start = sel.anchorNode.findParent('.b-comment') || sel.anchorNode.findParent('.b-blog-entry')
    if (!start) return;
    let end = sel.focusNode.findParent('.b-comment') || sel.focusNode.findParent('.b-blog-entry')
    if (!end || start != end) return;
    end.classList.add('x1-has-selected-text')
    this.selection = sel.toString()
  }
}

const formAugmentation = {
  init: async function() {
    this.area = this.getTextArea()

    if (this.area) {
      await this.setupExtraPanel()
      this.setupMarkupPanel()
      this.handlePasting()
      this.handleDropping()
      this.area.setAttribute('placeholder', 'Сюда можно бросать и вставлять из буфера обмена файлы')
      ;['smileys', 'snippets'].forEach(async (type) => await this[`init_${type}`]() )
    }
    this.init_images() // always needed so a user can add image snippets
  },
  getTextArea: function(state=app.state) {
    if (state == 'newsentry' || state == 'thread')
      return $('#comment_form_text')
    else if (state == 'form') {
      let multiAreas = $('#blog_form')._$$('textarea:not(#template_last_posts)')
      multiAreas.forEach(area => {
        area.addEventListener('focus', () => this.area = area)
      })
      return multiAreas[0]
    }
    else {
      return false
    }
  },
  getExtraPanelLocation: function(state=app.state) {
    if (state == 'newsentry' || state == 'thread') {
      return ['.b-comment-form', 'beforebegin']
    }
    if (state == 'form') {
      return ['textarea[name=text]', 'beforebegin']
    }
  },
  setupExtraPanel: async function(state=app.state) {
    let [selector, relativePosition] = this.getExtraPanelLocation()
    , supportedPanes = {
      'smileys': 'Смайлики',
      'snippets': 'Сниппеты',
      'images': (['newsentry', 'form'].includes(state)) && 'Картинки',
    }
    , btns = '', panes = ''
    for (let p in supportedPanes) {
      if (supportedPanes[p]) {
        btns += `<button type="button" class="x1-btn" data-pane="${p}">${supportedPanes[p]}</button>`
        panes += `<div class="x1-xp-pane" id="x1-xp-pane-${p}" style="display:none"></div>`
      }
    }
    let panel = $(selector)._ins(relativePosition, `
      <div class="x1-form-extra-panel">
        <div class="x1-xp-pane-switcher x1-btn-group">${btns}</div>
        ${panes}
      </div>`, true)
    panes = panel._$$('.x1-xp-pane')
    btns = panel._$$('.x1-xp-pane-switcher .x1-btn')
    btns.forEach(btn => {
      btn.addEventListener('click', ev => {
        ev.preventDefault()
        ev.stopPropagation()
        panes.forEach(pane => {
          if (pane.id == `x1-xp-pane-${btn.dataset.pane}`) {
            if (pane.style.display == 'none') {
              pane.style.display = ''
              btn.classList.add('x1-xp-switcher-selected')
            }
            else {
              pane.style.display = 'none'
              btn.classList.remove('x1-xp-switcher-selected')
            }
          }
          else {
            pane.style.display = 'none'
          }
        })
        btns.forEach(b => {
          if (b.dataset.pane != btn.dataset.pane) {
            b.classList.remove('x1-xp-switcher-selected')
          }
        })
      })
    })
  },
  known_smileys: {
    gif: ["coolface", "desu", "nyan", "sobak", "trollface", "slon", "ssaksa", "sraksa", "sosak", "makak", "pauk", "popka", "popka2", "cheez", "weed"],
    png: ["awesome", "ffuu", "okay", "rage", "deb", "oru", "doge", "sheez", "poo", "hero", "yajka", "joseph", "ussr", "kpss", "yes", "you", "projector"],
    jpg: ["cuni"]
  },
  smile_map: {"poo_target": "png"},
  init_smileys: function() {
    for (let ext in this.known_smileys) {
      this.known_smileys[ext].forEach(s => {
        let code = `:${s}:`
        , smil = $('#x1-xp-pane-smileys')._ins('beforeend', 
          `<img class="smiley x1-snippet-img x1-insert-smiley" src="/img/${s}.${ext}" alt="${code}" title="${code}">`, true)
        smil.addEventListener('click', () => {
          this.insertText({end: code})
        })
        this.smile_map[s] = ext
        // Remove unsupported smileys
        smil.addEventListener('error', ev => {
          smil.remove()
        })
      })
    }
  },
  insertText: function({
    start = '',
    end = '',
    forceInline = false,
    innerNewLine = false,
    outerNewLine = false,
    replace = false
    } = {}) {
    let val = this.area.value
    , selStart = this.area.selectionStart
    , selEnd = this.area.selectionEnd
    , before = val.slice(0, selStart)
    , inside = val.slice(selStart, selEnd)
    , after = val.slice(selEnd)
    , insideMultiline = ''
    if (forceInline) {
      let lines = inside.split('\n')
      if (lines.length > 1)
        insideMultiline = lines.map(line => line.length ? start+line+end : line).join('\n')
    }
    innerNewLine = innerNewLine ? '\n' : ''
    let preNewLine = (outerNewLine && start && !(before=='' || before.slice(-1)  == '\n')) ? '\n' : ''
    , postNewLine  = (outerNewLine && end   && !(after==''  || after.slice(0, 1) == '\n')) ? '\n' : ''
    , textPre = before + preNewLine + (insideMultiline ? '' : (start + innerNewLine))
    , textIn = insideMultiline || (replace ? '' : inside)
    , textPost = (insideMultiline ? '' : (innerNewLine + end)) + postNewLine + after
    this.area.value = textPre + textIn + textPost
    if (start && end) {
      this.area.selectionStart = textPre.length
      this.area.selectionEnd = textPre.length + textIn.length
    }
    this.area.focus()
  },
  setupMarkupPanel: function() {
    let markPan = this.area._ins('beforebegin', `<div class="x1-markup-panel">
      <button type="button" class="x1-btn x1-add-text-snippet" title="Сохранить выделенный текст как заготовку" style="float:right">+ Сниппет</button>
      <div class="x1-btn-group x1-inline-btn-group">
        <button type="button" class="x1-btn x1-bb-code" title="Жирный" data-start="**" data-end="**"><b>Ж</b></button>
        <button type="button" class="x1-btn x1-bb-code" title="Курсив" data-start="*" data-end="*"><i>К</i></button>
        <button type="button" class="x1-btn x1-bb-code x1-bb-force-inline" title="Зачеркнуто" data-start="--" data-end="--"><s>Z</s></button>
        <button type="button" class="x1-btn x1-bb-code" title="Спойлер" data-start="%%" data-end="%%"><span class="b-spoiler-text">%</span></button>
      </div> <div class="x1-btn-group x1-inline-btn-group">  
        <button type="button" class="x1-btn x1-bb-code x1-bb-force-inline x1-bb-outer-newline" title="Заголовок" data-start="=== " data-end=" ==="><span style="transform: scale(1.25); display: block">H2</span></button>
        <button type="button" class="x1-btn x1-bb-code x1-bb-force-inline x1-bb-outer-newline" title="Подзаголовок" data-start="## " data-end=" ##">H3</button>
      </div> <div class="x1-btn-group x1-inline-btn-group"> 
        <button type="button" class="x1-btn x1-btn-monospace x1-bb-code x1-bb-force-inline" title="Моноширинный" data-start="&#96;" data-end="&#96;">();</button>
        <button type="button" class="x1-btn x1-btn-monospace x1-bb-code x1-bb-outer-newline x1-bb-inner-newline" title="Моноширинный блок" data-start="/---" data-end="&#92;---"><span>{</span><span>}</span></button>
      </div> <div class="x1-btn-group x1-inline-btn-group">  
        <button type="button" class="x1-btn x1-bb-code x1-bb-force-inline" title="Цитата" data-start="&gt;&gt;" data-end="&lt;&lt;" style="color:#789922">«»</button>
        <button type="button" class="x1-btn x1-bb-code x1-bb-force-inline x1-bb-outer-newline" title="Построчное цитирование" data-start="&gt; " style="color:#789922">&gt; </button>
      </div>
      <button type="button" class="x1-btn x1-insert-url" title="Вставить ссылку"><div class="x1-url-icon"></div></button>
      ${siteSpecific.current?.features?.includes('voice') ? 
        `<button type="button" class="x1-btn x1-select-voice" title="Text-to-speech">TTS</button>`
      :''}
      <button type="button" class="x1-btn x1-add-file" title="Загрузить файл">Файл ↑</button>
    </div>`, true)
    this.fileInput = document.body._ins('afterend', `<input type="file" id="x1-file-input" style="display: none">`, true)
    markPan._$$('.x1-bb-code').forEach(bb => {
      bb.addEventListener('click', ev => {
        ev.preventDefault()
        this.insertText({
          start: bb.dataset.start || '',
          end: bb.dataset.end || '',
          forceInline:  bb.classList.contains('x1-bb-force-inline'),
          innerNewLine: bb.classList.contains('x1-bb-inner-newline'),
          outerNewLine: bb.classList.contains('x1-bb-outer-newline')
        })
      })
    })
    markPan._$('.x1-add-text-snippet').addEventListener('click', ev => {
      ev.preventDefault()
      this.addTextSnippet()
    })
    markPan._$('.x1-insert-url').addEventListener('click', ev => {
      ev.preventDefault()
      let url = prompt('Введите адрес ссылки')
      this.insertText({
        start: `"`,
        end: `":${url} `
      })
    })
    markPan._$('.x1-add-file').addEventListener('click', ev => {
      ev.preventDefault()
      this.fileInput.click()
    })
    this.fileInput.addEventListener('change', ev => {
      this.processFiles([...ev.target.files])
    })

    let ttsBtn = markPan._$('.x1-select-voice')
    ttsBtn?.addEventListener('click', ev => {
      ev.preventDefault()
      ttsBtn.remove()
      markPan._ins('beforeend', `<br><div class="x1-tts">
        <select id="x1-tts">
        ${this.voices.map(v =>
          `<option value="${v.default ? '' : v.name}">${capitalize(v.name)}</option>
          ${v.emotions ? v.emotions.map(e => 
            `<option value="${v.name}&emotion=${e}">${capitalize(v.name)} (${e})</option>`
          ).join('') :''}`
        ).join('')}
        </select>
        <button type="button" class="x1-btn x1-tts-insert">Вставить</button>
      </div>`)
      markPan._$('.x1-tts-insert').addEventListener('click', ev => {
        ev.preventDefault()
        let speaker = markPan._$('#x1-tts').value
        if (speaker != '') {
          speaker = '&speaker='+speaker
        }
        this.insertText({
          start: `#%`,
          end: `${speaker}%#`
        })
      })
    })
  },
  voices: [
    {
      name: 'alena',
      gender: 'f',
      emotions: ['good'],
      default: true
    },
    {
      name: 'ermil',
      gender: 'm',
      emotions: ['good']
    },
    {
      name: 'jane',
      gender: 'f',
      emotions: ['good', 'evil']
    },
    {
      name: 'omazh',
      gender: 'f',
      emotions: ['evil']
    },
    {
      name: 'zahar',
      gender: 'm',
      emotions: ['good']
    }
  ],
  defaultImageServices: {
    imgur: {
      analyze: async (txt) => new Promise((resolve, reject) => {
        let m = txt.match(/^(?:https?\:\/\/)?(?:i\.)?imgur\.com\/(.+\/)?([^\/\.\s]+)(?:\..*)?$/i)
        if (!m) resolve(false);
        if (m[1]) { // A case when a pasted link is a link to a post rather than an image
          GM.xmlHttpRequest({
            method: "GET",
            url: txt,
            onload: function(res) {
              let p = res?.responseText?.match(/meta property="og\:image".+?content=".+?imgur\.com\/([^\.]+)/)
              if (p) resolve(p[1])
            }
          })
        }
        else {
          resolve(m[2])
        }
      }),
      key: 'i',
      getImg: code => `https://i.imgur.com/${code}.png`
    },
    catbox: {
      exp: /^(?:https?\:\/\/)?files\.catbox\.moe\/([0-9a-z\.]+)$/i,
      key: 'c',
      getImg: code => `https://files.catbox.moe/${code}`
    },
    generic: {
      exp: /^(https?\:\/\/.+?\/[^\s\/]+\.(?:jpe?g|png|gif|webp)(?:\?\S+)?)$/i,
      getImg: code => code,
      key: false
    }
  },
  wrapImgCode: function(svc, code) {
    let service = this.imageServices[svc]
    , key = service.key
    return (svc=='generic' || service.likeGeneric)
      ? `[${service.getImg(code)}]`
      : `[${key}:${code}:]`
  },
  imageServices: {},
  parseLink: async function(txt) {
    for (let svc in this.imageServices) {
      let service = this.imageServices[svc]
      , code = service.analyze
        ? await service.analyze(txt)
        : txt.match(service.exp)?.[1]
      if (code) {
        // For the case when a service behaves like generic but must store data like named to be used by other sites
        if (service.getCompactCode)
          code = service.getCompactCode(code)
        return [svc, code]
        break;
      }
    }
    return [null,null]
  },
  handlePasting: function() {
    this.area.addEventListener('paste', async (ev) => {
      // Handle files
      let fileItems = [...(ev?.clipboardData?.items || [])].filter(item => item?.kind == 'file')
      if (fileItems.length) {
        this.processFiles(fileItems)
      }
      // Handle image links
      else {
        let txt = ev?.clipboardData?.getData('text')
        if (txt)
          this.processPastedText(txt, true)
      }
    })
  },
  handleDropping: function() {
    this.area.addEventListener('drop', ev => {
      if (ev.dataTransfer?.files?.length) {
        ev.preventDefault()
        this.processFiles([...ev.dataTransfer.files])
      }
    })
  },
  uploadFile: function(file) {return new Promise( async (resolve, reject) => {
    let fd = new FormData()
    fd.append('reqtype', 'fileupload')
    fd.append('userhash', '')
    fd.append('fileToUpload', file)

    GM.xmlHttpRequest({
      method: "POST",
      url: UPLOAD_API,
      headers: {
        "accept": "application/json",
        "cache-control": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "accept": "application/json"
      },
      "credentials": "include",
      onload: function(res) {
        resolve(res)
      },
      onerror: function(e) {
        reject(e)
      },
      data: fd,
      fetch: true // https://stackoverflow.com/a/77206951/1561204
    })
  })},
  processFiles: async function(fileItems) {
    let uploadMsg = this.area._ins('afterend', `<div class="x1-message">Загружаем файлы...</div>`, true)
    await Promise.all(fileItems.map(async (file) => new Promise(async (resolve) => {
      if (! (file instanceof File))
        file = file.getAsFile()
      try {
        let txt = (await this.uploadFile(file))?.responseText
        if (txt)
          this.processPastedText(txt, false)
      }
      catch(e) {
        console.error('File upload error: ', e)
      }
      resolve()
    })))
    uploadMsg.remove()
  },
  processPastedText: async function(txt, replace) {
    let [service, code] = await this.parseLink(txt)
    if (!code) return;
    let codeWrapped = this.addImageSnippet({
      service: service,
      code: code,
    })
    window.requestAnimationFrame(() => {
      this.area.value = replace
        ? this.area.value.replace(txt, codeWrapped)
        : this.area.value + codeWrapped
    })
  },
  forceRevealPane: id => $(`.x1-btn:not(.x1-xp-switcher-selected)[data-pane=${id}]`)?.click(),
  imageSnippets: [],
  textSnippets: [],
  saveImgSnippets: function() {
    let shortForm = this.imageSnippets.map(s => `${s.service} ${s.code} ${s.thumb || '='}`)
    GM.setValue('image-snippets', JSON.stringify(shortForm))
  },
  saveTxtSnippets: function() {
    GM.setValue('text-snippets', JSON.stringify(this.textSnippets))
  },
  init_images: async function() {
    // Filter and modify image services for the specific site, generate reverse expressions
    siteSpecific.current.imgSvc.supported.forEach(svc => {
      let service = Object.assign(this.defaultImageServices[svc], siteSpecific.current.imgSvc?.[svc] || {})
      // Named image service expressions
      if (service.key !== false) {
        service.reverseExp = new RegExp(`^\\[${service.key}\\:([^\\s\\/\\:]+)\\:\\]`, 'i')
      }
      // Unnamed image services with a list of hosts
      else if (service.supportedHosts) {
        let expr = `(https\\:\\/\\/[\\S]*(?:` + 
          service.supportedHosts
            .map(host => host.replace(/\./, '\\.')).join('|') +
          `)\\/[^\\s\\:]+\\.(?:jpe?g|png|gif|webp))`
        service.exp = new RegExp(`^${expr}$`, 'i')
        service.reverseExp = new RegExp(`^\\[${expr}\\]$`, 'i')
      }
      // Generic service (any host)
      else if(svc == 'generic') {
        service.reverseExp = new RegExp(`^\\[${service.exp.source.slice(1,-1)}\\]$`, 'i')
      }
      if (service.reverseExp) {
        this.imageServices[svc] = service
      }
      else {
        console.warn('Unable to generate reverse expression for: ', svc)
      }
    })

    let images = await GM_getJSON('image-snippets')
    if (images?.length) {
      for (let entry of images) {
        let svc, code, thumb
        try {
          [svc, code, thumb] = entry.split(' ')
        } catch(e) {
          console.warn('Image snippet has wrong format: ', entry)
          continue
        }                // Unsupported snippets will be added to the model to keep it 
        let skip = true // consistent across sites but no actual snipet will be created
        if (svc && svc in this.imageServices) {
          let service = this.imageServices[svc]
          if (svc!='generic' || code.match(service.exp)) {
            skip = false
          }
          else {
            console.warn(`Unsupported host @ "${entry}"`)
          }
        }
        else {
          console.warn(`Unsupported service: ${svc} @ "${entry}"`)
        }
        this.addImageSnippet({
          skip: skip,
          service: svc,
          code: code,
          thumb: thumb=="=" ? false : thumb,
          save: false
        })
      }
    }
  },
  findImageSnippet: function(svc, code) {
    return this.imageSnippets.find(img => img.service == svc && img.code == code)
  },
  deleteImageSnippet: function(svc, code, imgLink) {
    this.imageSnippets = this.imageSnippets.filter(img => img.service != svc || img.code != code)
    if (!imgLink) {
      imgLink = $(`.x1-img-snippet[title="${this.wrapImgCode(svc, code)}"]`)
    }
    $$(`.x1-image-link[data-svc-code="${svc}:${code}"]`).forEach(linkInPost => {
      linkInPost.classList.remove('x1-snippet-added')
    })
    imgLink?.remove()
    this.saveImgSnippets()
  },
  addImageSnippet: /*async*/ function({
    service,
    code, // unwrapped
    thumb = false,
    save = true, // Add snippet to storage (false when reading storage)
    skip = false, // Only add to the model, do not create the actual snippet
    fromPost = false
    } = {}) {
    let dup = this.findImageSnippet(service, code)
    if (dup) {
      console.warn('Image already present')
    }
    else {
      this.imageSnippets.push({
        service: service,
        code: code,
        thumb: thumb
      })
    }
    $$(`.x1-image-link[data-svc-code="${service}:${code}"]`).forEach(linkInPost => {
      linkInPost.classList.add('x1-snippet-added')
    })
    if (save) {
      this.saveImgSnippets()
    }
    if (!this.area || skip) return;
    let codeWrapped = this.wrapImgCode(service, code)
    if (dup) return codeWrapped;
    let url = this.imageServices[service].getImg(code)
    , isVideo = !thumb && code.match(/\.(?:webm|mp4)$/i)
    , imgLink = $('#x1-xp-pane-images')?._ins('afterbegin',
      `<a href="${url}" class="x1-img-snippet x1-snippet-img x1-snippet" title="${codeWrapped}">
        ${isVideo
          ? `<video autoplay loop muted src="${url}"></video>`
          : `<img src="${thumb || url}">` }
        <div class="x1-floating-btn x1-snippet-action x1-snippet-delete" title="Удалить заготовку"></div>
      </a>`, true)
    if (imgLink) {
      imgLink.addEventListener('click', ev => {
        ev.preventDefault()
        this.insertText({end: codeWrapped})
      })
      imgLink._$('.x1-snippet-delete').addEventListener('click', ev => {
        ev.preventDefault()
        ev.stopPropagation()
        this.deleteImageSnippet(service, code, imgLink)
      })
      if (save) {
        this.forceRevealPane('images')
      }
    }
    return codeWrapped
  },
  init_snippets: async function() {
    let snippets = await GM_getJSON('text-snippets')
    if (snippets?.length) {
      snippets.forEach(txt => {
        if (typeof txt == 'string') {
          this.addTextSnippet(txt, false)
        }
      })
    }
  },
  addTextSnippet: function(txt = this.area.value.slice(this.area.selectionStart, this.area.selectionEnd), save=true) {
    if (!txt.length || this.textSnippets.includes(txt) ) return;
    // Check if selected text is actually an image code (will not match if text contains any extra characters)
    let imgFound = false
    for (let svc in this.imageServices) {
      let match = txt.trim().match(this.imageServices[svc].reverseExp)
      if (match && match[0]==txt.trim()) {
        let code = match[1]
        if (this.imageServices[svc].getCompactCode)
          code = this.imageServices[svc].getCompactCode(code)
        this.addImageSnippet({
          service: svc,
          code: code,
        })
        imgFound = true
        break
      }
    }

    if (!imgFound) {
      let snippet = $('#x1-xp-pane-snippets')._ins('afterbegin', `<div class="x1-snippet x1-txt-snippet">
        ${escapeHtml(txt).replace(/\n/g, ' <br>')}
        <div class="x1-floating-btn x1-snippet-action x1-snippet-expand" title="Развернуть"></div>
        <div class="x1-floating-btn x1-snippet-action x1-snippet-collapse" title="Свернуть"></div>
        <div class="x1-floating-btn x1-snippet-action x1-snippet-delete" title="Удалить"></div>
      </div>`, true)
      snippet.addEventListener('click', ev => this.insertText({end: txt}))
      snippet._$$('.x1-snippet-action').forEach(btn => {
        let action
        if (btn.classList.contains('x1-snippet-expand')) {
          action = () => snippet.classList.add('x1-snippet-expanded')
        }
        if (btn.classList.contains('x1-snippet-collapse')) {
          action = () => snippet.classList.remove('x1-snippet-expanded')
        }
        if (btn.classList.contains('x1-snippet-delete')) {
          action = () => {
            this.textSnippets = this.textSnippets.filter(s => s != txt)
            this.saveTxtSnippets()
            snippet.remove()
          }
        }
        if (action)
          btn.addEventListener('click', ev => {
            ev.stopPropagation()
            action()
          })
      })
      this.textSnippets.push(txt)
      if (save) {
        this.forceRevealPane('snippets')
        this.saveTxtSnippets()
      }
    }
  },

}

const hiddenItems = {
  init: async function() {
    this.initPosts()
    await this.initText()
    await this.initImages()
    // (initial scan will be performed @ comments initialization)
  },
  // ---------------------------- Images ----------------------------
  imgURLs: [],
  addImage: function(url, initial=false) {
    if (this.imgURLs.includes(url)) return;
    this.imgURLs.push(url)
    if (!initial) {
      this.saveImages()
      this.updateImageUI()
      this.rescan()
    }
  },
  removeImage: function(url) {
    let found = false
    this.imgURLs = this.imgURLs.filter(u => {
      if (u == url) {
        found = true
        return false
      }
      else return true;
    })
    if (found) {
      this.saveImages()
      this.updateImageUI()
      this.rescan()
    }
  },
  saveImages: function() {
    GM.setValue('image-hidelist', JSON.stringify(this.imgURLs))
  },
  updateImageUI: function(fromUI=false) {
    this.url_area.value = this.imgURLs.join('\n')
    this.url_area.rows = Math.max(4, this.imgURLs.length+1)
    if (fromUI)
      settings.flashLabel('image-hidelist')
  },
  updateImagesFromUI: function() { // On user save
    this.imgURLs = []
    let lines = this.url_area.value.split(/\n/)
    if (lines?.length) {
      this.processImageList(lines)
    }
    this.updateImageUI(true)
    this.rescan()
    this.saveImages()
  },
  initImages: async function() {
    this.url_area = $('#x1-url-hidelist')
    $('#x1-update-url-hidelist').addEventListener('click', () => this.updateImagesFromUI())
    let images = await GM_getJSON('image-hidelist')
    if (images?.length) {
      this.processImageList(images)
      this.updateImageUI()
    }
  },
  processImageList: function(images) {
    images.map(url => url.trim())
    .filter(url => url.length)
    .forEach(url => this.addImage(url, true))
  },
  // ----------------------------- Text -----------------------------
  texts: [],
  regExps: [],
  normalizeText: function(txt) {
    return txt.trim().toLowerCase()
  },
  addText: function(txt, {refresh=true, tryRegExp=false}={}) {
    txt = this.normalizeText(txt)
    if (!txt || this.texts.includes(txt)) return;
    let rx = false
    if (tryRegExp) {
      let maybeRegExp = txt.match(/^\/(.+)\/([imgy]{0,4})$/i)
      if (maybeRegExp) {
        let [exp, flags] = maybeRegExp.slice(1)
        flags = `i${~flags.indexOf('m') ? 'm' : ''}`
        try {
          rx = new RegExp(exp, flags)
        } catch(e) {
          console.warn('Error parsing RegExp:', txt, e)
        }
      }
    }
    if (rx) {
      this.texts.push(`/${rx.source}/${rx.flags}`)
      this.regExps.push(rx)
    }
    else {
      this.texts.push(txt)
      this.regExps.push(new RegExp(escapeRegExp(txt), 'i'))
    }
    if (refresh) {
      this.saveTexts()
      this.updateTextUI()
      this.rescan()
    }
  },
  removeText: function(txt) {
    let found = false
    let textsFiltered = this.texts.filter(t => {
      if (t == txt) {
        found = true
        return false
      }
      else return true;
    })
    if (found) {
      this.processTextList(textsFiltered)
      this.saveTexts()
      this.updateTextUI()
      this.rescan()
    }
  },
  updateTextFromUI: function() { // On user save
    let lines = this.text_area.value.split(/\n/)
    this.processTextList(lines)
    this.updateTextUI(true)
    this.saveTexts()
    this.rescan()
  },
  processTextList: function(lines) {
    this.texts = [];
    this.regExps = [];
    lines.forEach(line => {
      this.addText(line, {refresh: false, tryRegExp: true})
    })
  },
  updateTextUI: function(fromUI=false) {
    this.text_area.value = this.texts.join('\n')
    this.text_area.rows = Math.max(4, this.texts.length+1)
    if (fromUI)
      settings.flashLabel('text-hidelist')
  },
  initText: async function() {
    this.text_area = $('#x1-text-hidelist')
    $('#x1-update-text-hidelist').addEventListener('click', () => this.updateTextFromUI())
    let texts = await GM_getJSON('text-hidelist')
    if (texts?.length) {
      this.processTextList(texts)
      this.updateTextUI()
      this.saveTexts()
    }
  },
  saveTexts: function() {
    GM.setValue('text-hidelist', JSON.stringify(this.texts))
  },
  // ---------------------------- Posts -----------------------------
  hiddenPosts: [],
  unHiddenPosts: [],
  initPosts: function() {
    this.hiddenPosts = LS_getJSON('post-hidelist') || []
    this.unHiddenPosts = LS_getJSON('post-showlist') || []
  },
  savePosts: function() {
    LS_saveJSON('post-hidelist', this.hiddenPosts)
    LS_saveJSON('post-showlist', this.unHiddenPosts)
  },
  addPost: function(post, passive=false) {
    let id = this.getPostID(post)
    let wasUnhidden = false
    this.unHiddenPosts = this.unHiddenPosts.filter(p => {
      if (p == id) {
        wasUnhidden = true
        return false
      }
      else return true;
    })
    let pushed = false
    if (!wasUnhidden || !this.isImplicitlyHidden(post)) {
      if (this.hiddenPosts.includes(id)) return;
      this.hiddenPosts.push(id)
      pushed = true
    }
    if (!wasUnhidden && !pushed) return;
    if (!passive)
      this.rescan()
    this.savePosts()
  },
  isImplicitlyHidden: function(post) {
    return post.classList.contains('x1-hidden-by-text') 
      || post.classList.contains('x1-hidden-by-image')
  },
  removePost: function(post) {
    let id = this.getPostID(post)
    if (this.unHiddenPosts.includes(id)) return;
    let found = false
    this.hiddenPosts = this.hiddenPosts.filter(p => {
      if (p == id) {
        found = true
        return false
      }
      else return true;
    })
    // Check if the post was hidden by other means
    if (this.isImplicitlyHidden(post)) {
      this.unHiddenPosts.push(id)
    }
    else if (!found) return; // No need to rescan
    this.rescan()
    this.savePosts()
  },
  getPostID: function(post) {
    return post?.id?.split(/(?:post|comment)_/)?.[1]
  },
  checkPost: function(post) {
    let id = this.getPostID(post)
    return this.hiddenPosts.includes(id) && !this.unHiddenPosts.includes(id)
  },
  isUnhidden: function(post) {
    let id = this.getPostID(post)
    return this.unHiddenPosts.includes(id)
  },
  // --------------------------- General ----------------------------
  rescan: function() {
    ;['b-blog-entry', 'b-comment'].forEach(sel => {
      $$(`.${sel}`).forEach(post => {
        let body = post._$(`.${sel}_b-body`)
        if (body)
          this.scanPost(post, body)
      })
    })
  },
  scanPost: function(post, body, skipImg=false) {
    let id = this.getPostID(post)
    , isUnhidden = this.unHiddenPosts.includes(id)
    post.classList.remove('x1-post-hidden', 'x1-hidden-by-text', 'x1-hidden-by-id')
    if (this.hiddenPosts.includes(id) && !isUnhidden) {
      post.classList.add('x1-post-hidden', 'x1-hidden-by-id')
    }
    let txt = this.normalizeText(body.innerText)
    , header = post._$('.b-blog-entry_b-header')
    header = header && this.normalizeText(header.innerText)
    for (let exp of this.regExps) {
      if ((exp.test(txt) || (header && exp.test(header))) && !isUnhidden) {
        post.classList.add('x1-post-hidden', 'x1-hidden-by-text')
        if (!  post._$('.x1-hiddenpost-charcount')) {
          let header = post._$('.b-comment_b-info') || post._$('.b-blog-entry_b-header')
          if (header)
            header._ins('beforeend', `<i class="x1-hiddenpost-charcount">(${txt.length} зн.)</i>`)
        }
        if (skipImg)
          return true
      }
    }
    if (!skipImg) {
      for (let img of [...body._$$('img:not(.smiley):not(.x1-warning)'), ...body._$$('video')]) {
        this.scanImage(img, post, isUnhidden)
      }
    }
    else return false
  },
  scanImage: async function(img, post, isUnhidden) {
    post.classList.remove('x1-hidden-by-image')
    let toHide = false
    , imgData = await comments.getImgData(img)
    if (imgData) {
      let {hideByImg, hideByLink, link} = await comments.getImgData(img)
      link.classList.remove('x1-img-hidden', 'x1-img-hidden-by-img', 'x1-img-hidden-by-link')
      if (this.isImgHidden(link, hideByImg, hideByLink) && !isUnhidden)
        post.classList.add('x1-post-hidden', 'x1-hidden-by-image')
    }
  },
  isImgHidden: function(link, hideByImg, hideByLink) {
    let toHide = false
    if (this.imgURLs.includes(hideByImg)) {
      link.classList.add('x1-img-hidden', 'x1-img-hidden-by-img')
      toHide = 'img'
    }
    if (hideByLink) {
      hideByLink = this.normalizeText(hideByLink)
      for (let exp of this.regExps) {
        if (exp.test(hideByLink)) {
          link.classList.add('x1-img-hidden', 'x1-img-hidden-by-link')
          toHide = 'link'
          break
        }
      }
    }
    return toHide
  }
}

const settings = {
  init: function() {
    let cw = $('.l-content-wrap')
    , rp = $('.l-right-panel-wrap')
    if (!(cw && rp)) {
      console.warn('Unable to initialize settings')
      return
    }
    rp._ins('beforeend', 
      `<center><button type="button" id="x1-settings-open" class="x1-btn">1chan-X</button></center>`
    , true)._$('button').addEventListener('click', () => {
      if (cw?.classList) {
        if(cw.classList.contains('x1-settings-enabled'))
          cw.classList.remove('x1-settings-enabled')
        else 
          cw.classList.add('x1-settings-enabled')
      }
      rp.classList.remove('x1-panel-shown')
    })
    this.panel = $('.l-content-wrap')._ins('beforeend', `<div class="x1-settings b-blog-form">
      <h1>1chan-x <i>v.${GM.info.script.version}</i></h1>
      <div class="b-blog-form_b-form">
        <div class="b-blog-form_b-form_b-field">
          <h2>Автоскрытие текста <div id="text-hidelist-label" class="x1-label x1-label-succ">Сохранено</div></h2>
          <p>Введите текст или /регулярные выражения/</p>
          <textarea rows="4" id="x1-text-hidelist"></textarea>
          <center><button type="button" id="x1-update-text-hidelist" class="x1-btn">Сохранить</button></center>
        </div>
        <div class="b-blog-form_b-form_b-field">
          <h2>Автоскрытие изображений <div id="image-hidelist-label" class="x1-label x1-label-succ">Сохранено</div></h2>
          <p>Введите URL изобоажения</p>
          <textarea rows="4" id="x1-url-hidelist"></textarea>
          <center><button type="button" id="x1-update-url-hidelist" class="x1-btn">Сохранить</button></center>
        </div>
      </div>
      <center><button type="button" id="x1-settings-close" class="x1-btn">Закрыть</button></center>
    </div>`, true)
    this.panel._$('#x1-settings-close').addEventListener('click', () => 
      cw?.classList?.remove('x1-settings-enabled'))
  },
  flashLabel: function(id) {
    let label = $(`#${id}-label`)
    if (!label) return;
    label.classList.add('x1-label-shown')
    setTimeout(() => label.classList.remove('x1-label-shown'), 2000)
  }
}

function setupPanels() {
  $('.b-top-panel')._ins('afterbegin', `
    <div class="x1-panel-toggle x1-panel-toggle-inmenu x1-panel-toggle-inmenu-left" data-panel="left"></div>
    <div class="x1-panel-toggle x1-panel-toggle-inmenu x1-panel-toggle-inmenu-right" data-panel="right"></div>`)
  $$('.x1-panel-toggle-inmenu').forEach(t => {
    let sel = `.l-${t.dataset.panel}-panel-wrap`
    t.addEventListener('click', () => {
      let p = $(sel)
      if (!p.classList.contains('x1-panel-shown')) {
        p.classList.add('x1-panel-shown', 'x1-panel-transition')
      }
    })
  })
  ;['left', 'right'].forEach(lr => {
    let p = $(`.l-${lr}-panel-wrap`)
    let hide = () => {
      p.classList.remove('x1-panel-shown')
      setTimeout(() => p.classList.remove('x1-panel-transition'), 200)
    }
    p.addEventListener('click', ev => {
      let bcr = p.getBoundingClientRect()
      if ( (lr=='left' && ev.pageX > bcr.width)
        || (lr=='right' && ev.pageX < bcr.x) ) {
        hide()
      }
    })
    p._ins('afterbegin',
      `<div class="x1-panel-toggle x1-panel-toggle-inpanel"></div>`, true)
    .addEventListener('click', hide)
  })
}

function fixMenuForTouch() {
  let ul = ($('.b-blog-panel') || $('.b-chat-panel'))?._$('ul')
  if (ul && ul._$('li img + a')) {
    ul._$$('li').forEach(li => {
      let a = li._$('a')
      , text = a.textContent
      , icon = a.previousSibling
      if (icon?.textContent?.match(/^\s+$/)) // First result will be either an emoji or an empty space
        icon = icon.previousSibling // This time it will be image
      if (icon) {
        a.innerHTML = ''
        a.appendChild(icon)
        a._ins('beforeEnd', `<span>${text}</span>`)
      }
    })
  }
}

const darkTheme = {
  get isDark() {
    if (typeof this._darkNow === 'undefined') {
      this._darkNow = !!~document.querySelector('link[href*="production"]').href.indexOf('omsk')
    }
    return this._darkNow
  },
  init: function() {
    let currentSetting = siteSpecific.current?.darkTheme
    if (currentSetting) {
      this.noService = currentSetting?.noService
      this.darkLogoSrc = currentSetting?.logo?.src
      this.darkLogoCSS = currentSetting?.logo?.css
    }
    if (this.noService) {
      this.switchTheme(!!localStorage['useDarkTheme'])
    }
    document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" type="text/css" href="${cssBaseURL}/1chan-x-${this.isDark ? 'dark' : 'normal'}.css">`)
  },
  addSwitcher: function() {
    $('#x1-settings-open')._ins('afterend', 
      `<a class="x1-theme-switcher" href="/service/theme/${this.isDark ? 'normal' : 'omsk'}" title="Переключить тему"></a>`, true)
    .addEventListener('click', ev => {
      ev.preventDefault()
      this.handleThemeSwitch()
    })
  },
  handleThemeSwitch: function(toDark=!this.isDark) {
    this.switchTheme(toDark)
    this.fixLogo()
    // Save the setting 
    if (this.noService) { // in case it's broken (looking at you 1chan.top)
      localStorage['useDarkTheme'] = toDark ? 1 : ''
    }
    else {
      fetch(document.location.origin + `/service/theme/${toDark ? 'omsk' : 'normal'}`, {
        credentials: 'include'
      })
    }
  },
  switchTheme: function(toDark) {
    // Replace the production CSS
    let prod = document.querySelector('link[href*="production"]')
    prod.insertAdjacentHTML('afterend', `<link rel="stylesheet" type="text/css" href="/css/production${toDark ? '-omsk' : ''}.css" media="all">`)
    prod.remove()
    // Replace the extension CSS
    let user = document.querySelector(`link[href*="1chan-x-${toDark ? 'normal' : 'dark'}"]`)
    if (user) {
      user.insertAdjacentHTML('afterend', `<link rel="stylesheet" type="text/css" href="${cssBaseURL}/1chan-x-${toDark ? 'dark' : 'normal'}.css">`)
      user.remove()
    }
    this._darkNow = toDark
  },
  fixLogo: function(isDark=this.isDark) {
    // Replace the logo
    let logo = $('.b-header-block_b-logotype a img')
    logo.src = (isDark && this.darkLogoSrc) ? this.darkLogoSrc : (siteSpecific.current?.normalLogoSrc || '/img/logo.png')
    if (this.darkLogoCSS) {
      if (isDark)
        injector.inject('x1-dark-logo', `.b-header-block_b-logotype a img { ${this.darkLogoCSS} }`)
      else 
        injector.remove('x1-dark-logo')
    }
  }
}

const quickScroll = {
  init: function() {
    this.e = document.body._ins('afterbegin', `<div id="x1-quick-scroll"><div>↓</div></div>`, true)
    this.e.addEventListener('click', () => this.scroll())
    window.addEventListener('scroll', () => this.update())
    this.update()
  },
  scroll: function() {
    let newPosition = 0
    if (window.scrollY == 0) {
      newPosition = this.savedPosition || document.body.scrollHeight
    }
    else {
      this.savedPosition = window.scrollY
    }
    try {
      unsafeWindow.jQuery('html').animate({
        scrollTop: newPosition
      }, 100);
    }
    catch(e) {
      window.scrollTo(0, newPosition)
    }
  },
  update: function() {
    if (window.scrollY != 0)
      this.e.classList.add('x1-qs-up')
    else
      this.e.classList.remove('x1-qs-up')
  }
}

function addLiveLinkIcons() {
  $$('.b-live-entry a:first-child').forEach(a => {
    const url = new URL(a.href)
    const link = url?.search.split(/^\?to=/)?.[1]
    if (! link) return;
    const extURL = new URL(link)
    const host = extURL.hostname
    a._ins('beforebegin', `<img class="x1-livelink-icon" src="https://proxy.duckduckgo.com/ip3/${host}.ico">`)
  })
}

function setupShortFieldPadding() {
  const form = $('#blog_form')
  if (! form) return;

  const minLength = { title: 3, text: 15 }

  const btn = form._$('.b-blog-form_b-actions')._ins('beforeend', `<input type="submit" id="x1-fill-short-fields" value="Заполнить пустые поля">`, true)

  ;[form.title, form.text].forEach(input => {
    input.addEventListener('input', () => {
      btn.style.visibility = (form.title.value.length < minLength.title || form.text.value.length < minLength.text)
        ? 'visible'
        : 'hidden'
    })
  })

  function padField(field, minLength, filler = String.fromCharCode(173) /* shy */) {
    let diff = minLength - field.value.length
    if (diff <= 0) return;
    field.value += filler.repeat(diff)
  }

  btn.addEventListener('click', function(ev) {
    ev.preventDefault()
    padField(form.title, minLength.title)
    padField(form.text,  minLength.text)
    btn.style.visibility = 'hidden'
  })
}

// ============================================= Main =============================================

async function initAll() {
  settings.init()
  await hiddenItems.init()

  let state = determineState()
  if (state) {
    app.state = state
    $('.l-wrap').classList.add(`x1-state-${state}`)
  }
  if (stateHandlers?.[state]) {
    await stateHandlers[state]()
  }

  setupPanels()

  fixMenuForTouch()

  darkTheme.fixLogo()
  // Add theme switcher
  darkTheme.addSwitcher()

  // Add quick scroll-up
  quickScroll.init()

  addLiveLinkIcons()

  setupShortFieldPadding()

  // Easter egg
  let val = $('a[href*="validator.w3.org"]')
  if (val) {
    val._ins('beforeend', `<img class="smiley" src="/img/makak.gif">`)
  }
}

;(async function main() {
  // Add CSS
  document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" type="text/css" href="${cssBaseURL}/1chan-x-base.css">`)

  // Add viewport
  document.head.insertAdjacentHTML('afterbegin',
    `<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1">`)

  siteSpecific.init()

  darkTheme.init()

  if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
    initAll()
  }
  else {
    document.addEventListener('DOMContentLoaded', initAll)
  }
})() // Always last
