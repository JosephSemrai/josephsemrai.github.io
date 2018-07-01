
// Playlist code from Codepen author Mark Hillard
// music to respective artists
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
            mediaPath = '../music/',
            extension = '',
            tracks = [{

                "track": 1,
                "name": "(S) Donkey Kong - Bonus Room Blitz",
                "duration": "1:01",
                "file": "kong"
              },
              {
                "track": 2,
                "name": "(S) Lift Yourself",
                "duration": "2:28",
                "file": "scoop"
            }, {
                "track": 3,
                "name": "(S) doot E1M1",
                "duration": "3:12",
                "file": "doot"
            },{
                "track": 4,
                "name": "Dimmadome",
                "duration": "1:45",
                "file": "dim"
            },

            {
                "track": 5,
                "name": "(S) Mário World",
                "duration": "4:46",
                "file": "marioworld"
            },
            {
                        "track": 6,
                        "name": "bill nye the science man",
                        "duration": "0:34",
                        "file": "nye"
                    },  {
                                  "track": 7,
                                  "name": "stepping on the beach",
                                  "duration": "0:33",
                                  "file": "steppingonthe"
                              },
                              {
                                            "track": 8,
                                            "name": "(S) i'll make a man out of you but every s is emphasized",
                                            "duration": "3:03",
                                            "file": "sss"
                                        },
                                        {
                                                      "track": 9,
                                                      "name": "(S) Ark Patrol - Let Go",
                                                      "duration": "4:07",
                                                      "file": "letgo"
                                                  },
                                                  {
                                                                "track": 10,
                                                                "name": "All Star but Bitter, Dismal, Mournful, Somber, Sorrowful",
                                                                "duration": "3:25",
                                                                "file": "star"
                                                            },
                                                            {
                                                                          "track": 11,
                                                                          "name": "Modern Jingle Bells",
                                                                          "duration": "1:51",
                                                                          "file": "jingle"
                                                                      },
                                                                      {
                                                                                    "track": 12,
                                                                                    "name": "(S) Last",
                                                                                    "duration": "2:56",
                                                                                    "file": "older"
                                                                                },
                              {
                                                                          "track": 13,
                                                                          "name": "Krab Borg",
                                                                          "duration": "2:11",
                                                                          "file": "krab"
                                                                      },
{
                                                                          "track": 14,
                                                                          "name": "(S) gas - pop 7 (yw cole)",
                                                                          "duration": "14:35",
                                                                          "file": "pop7"
                                                                      },

                {
                      "track": 15,
                      "name": "(S) ra ra rasputin",
                      "duration": "4:03",
                      "file": "rasputin"
                },
                {
                      "track": 16,
                      "name": "(S) running in the 90's - need to finish that essay in 4 minutes?",
                      "duration": "4:03",
                      "file": "rasputin"
                },{
                    "track": 17,
                    "name": "David's Mario World Loop",
                    "duration": "3:19",
                    "file": "loop"
                },{
                    "track": 19,
                    "name": "ppap piano",
                    "duration": "1:05",
                    "file": "ppappiano"
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

                if ((index + 1) < trackCount || loopValue == 0) {
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
