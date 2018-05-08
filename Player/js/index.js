
// Playlist code from Codepen author Mark Hillard
// Music to respective artists
// kai i swear
var loopValue = 1;
var loop = false;
var loopText = ""
jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '../Music/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Lift Yourself",
                "duration": "2:28",
                "file": "scoop"
            }, {
                "track": 2,
                "name": "doot E1M1",
                "duration": "3:12",
                "file": "doot"
            },{
                "track": 3,
                "name": "Dimmadome",
                "duration": "8:30",
                "file": "dim"
            },
            {
                "track": 4,
                "name": "Mário World",
                "duration": "8:30",
                "file": "marioworld"
            },
            {
                        "track": 5,
                        "name": "bill nye the science man",
                        "duration": "0:34",
                        "file": "nye"
                    },

          ],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><span class="plNum">' + trackNumber + '.</span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
            }),
            trackCount = tracks.length,

            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...' + loopText);
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');

                if ((index + 1) < trackCount) {
                    index = index + loopValue;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnLoop = $('#btnLoop').on('click', function () {
    loop = !loop;
    console.log("Loop enabled: " + loop)
    if (loop) {
      loopValue = 0;
      loopText = "Repeat on."
      npAction.text('Now Playing...' + loopText);
    } else {
      loopValue = 1;
      loopText = ""
      npAction.text('Now Playing...' + loopText);
    }

            }),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

// initialize plyr
plyr.setup($('#audio1'), {});
