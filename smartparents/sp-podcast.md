## Podcast Bar
[Original Player DEMOS](https://aplayer.js.org/)

### for inline player:
add these codes to the position of the player
```html
<style>
.aplayer {
    border: 2px solid lightblue;
}
.aplayer .aplayer-pic{
    width: 140px;
    height: 140px
}
.aplayer .aplayer-pic .aplayer-play {
    zoom: 2
}
.aplayer .aplayer-info {
    margin-left: 140px;
    padding: 14px 7px 0 10px;
    height: 66px;
    box-sizing: border-box;
}
.aplayer .aplayer-info .aplayer-music .aplayer-title {
    display: block;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px
}
.aplayer .aplayer-info .aplayer-music .aplayer-author {
    font-size: 15px;
}
.aplayer ol {margin: 0!important; padding: 0!important;}
.aplayer .aplayer-info .aplayer-controller {
    margin-top: 30px;
}
.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap {
    margin: 0 5px 10px 5px;
}
.aplayer .aplayer-info .aplayer-controller .aplayer-time {
    zoom: 1.6;
}
.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar {
    height: 3px;
    border-radius: 20px;
}
.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-time-inner,
.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap {
    float: left;
}
.aplayer .aplayer-info .aplayer-controller .aplayer-time {
    line-height:16px;
}
</style>
<div id="mp3-player" class="aplayer"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.5.8/APlayer.min.js"></script>
```
with the following js
```js
  function initPlayer(opts) {
    window.player = new APlayer({
      element: document.getElementById('mp3-player'),                     
      narrow: false,                                                    
      autoplay: false,                                                   
      showlrc: 0,                                                            
      mutex: true,                                                       
      theme: '#e6d0b2',                                                  
      listmaxheight: opts.listHeight,                                   
      music: {
        title: 'I\'m a good man',
        author: 'Jacky Ma',
        url: 'http://devtest.qiniudn.com/secret base~.mp3',
        pic: 'http://devtest.qiniudn.com/secret base~.jpg',
        lrc: 'https://aplayer.js.org/secret base~君がくれたもの~.lrc'
      }
    });
  }
  // after get the music list json
  // e.g.
  // $.get('/', function (data) {
  //   var opts = { list: data.list, listHeight: '513px', share: data.share };
  //   initPlayer(opts);
  // })
  var opts = {list: null, listHeight: '0'};
  initPlayer(opts);
```
<hr>
### for popup player:
```html
<style>
    .aplayer {
      border: 2px solid lightblue;
    }
    .aplayer .aplayer-pic{
      width: 140px;
      height: 140px
    }
    .aplayer .aplayer-pic .aplayer-play {
      zoom: 2
    }
    .aplayer .aplayer-info {
      margin-left: 140px;
      padding: 14px 7px 0 10px;
      height: 140px;
      box-sizing: border-box;
    }

    .aplayer .aplayer-info .aplayer-music .aplayer-title {
      display: block;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px
    }
    .aplayer .aplayer-info .aplayer-music .aplayer-author {
      font-size: 15px;
    }
    .aplayer ol {margin: 0!important; padding: 0!important;}
    .aplayer .aplayer-info .aplayer-controller {
      margin-top: 30px;
    }
    .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap {
      margin: 0 5px 10px 5px;
    }
    .aplayer .aplayer-info .aplayer-controller .aplayer-time {
      zoom: 1.6;
    }
    .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar {
      height: 3px;
      border-radius: 20px;
    }
    .aplayer .aplayer-info .aplayer-controller .aplayer-time {
      line-height:16px;
    }
    .aplayer .aplayer-list ol li {
      height: 45px;
      line-height: 45px;
    }
    .aplayer .aplayer-lrc .aplayer-lrc-contents {
      width: 80% !important;
    }
    .aplayer .aplayer-list ol li .aplayer-list-cur {
      height: 100px;
      top: 0;
    }
  </style>
  <div id="mp3-player" class="aplayer"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.5.8/APlayer.min.js"></script>
```
with the following scripts:
```js
  function initPlayer(opts) {
    window.player = new APlayer({
      element: document.getElementById('mp3-player'),                       // Optional, player element
      narrow: false,                                                     // Optional, narrow style
      autoplay: false,                                                    // Optional, autoplay song(s), not supported by mobile browsers
      showlrc: 0,                                                        // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
      mutex: true,                                                       // Optional, pause other players when this player playing
      theme: '#e6d0b2',                                                  // Optional, theme color, default: #b7daff
      mode: 'random',                                                     // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
      listmaxheight: opts.listHeight,                                             // Optional, max height of play list
      music: opts.list || [
        {
          title: 'Debunking Old Wives\'s Tales',
          author: 'Jan 26, 2017',
          url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
          pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg',
          lrc: 'https://aplayer.js.org/あっちゅ～ま青春!.lrc'
        },
        {
          title: 'secret base',
          author: 'Jan 25, 2017',
          url: 'http://devtest.qiniudn.com/secret base~.mp3',
          pic: 'http://devtest.qiniudn.com/secret base~.jpg',
          lrc: 'https://aplayer.js.org/secret base~君がくれたもの~.lrc'
        },
        {
          title: 'Troubleshooting your Newborn',
          author: 'Jan 24, 2017',
          url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
          pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
          lrc: 'https://aplayer.js.org/回レ！雪月花.lrc'
        }
      ]
    });
  }
  // after get the music list json
  // e.g.
  // $.get('/', function (data) {
  //   var opts = { list: data.list, listHeight: '513px' };
  //   initPlayer(opts);
  // })
  var opts = {list: null, listHeight: '513px'};
  initPlayer(opts);
```