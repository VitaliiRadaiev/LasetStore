$(".audio").each(function () {
    let audioWrap = $(this);
    let audioEl = audioWrap.find("audio");
    let audio = audioEl.get(0);

    setupAudio();

    function setupAudio() {
        if (audio.buffered === undefined) return;

        audioEl.addClass("inactive");
        audioWrap.append(
            '<button type="button" class="toggle"></button>' +
            '<span class="time current">0:00</span>' +
            '<input type="range" class="progress" value="0" max="" disabled/>' +
            '<span class="time total">0:00</span>' +
            '<button type="button" class="mute"></button>'
        );

        audioWrap.find(".toggle").on("click", $.proxy(togglePlay, this));
        audioWrap.find(".mute").on("click", $.proxy(toggleMuteSound, this));
        audioWrap.find(".progress").on("input change", $.proxy(updateProgress, this));

        audioEl.on("timeupdate", $.proxy(updateTime, this));
        audioEl.on("loadeddata", $.proxy(updateTime, this));

    }

    function formatTime(time) {
        var hours = parseInt(time / (60 * 60) % 24);

        hours = hours > 0 ? padZero(hours) + ":" : "";

        return (
            hours +
            padZero(parseInt(time / 60 % 60)) +
            ":" +
            padZero(parseInt(time % 60))
        );
    }

    function toggleMuteSound() {
        if (audio.muted) {
            audio.muted = false;
            audioWrap.find(".mute").removeClass("muted");
        } else {
            audio.muted = true;
            audioWrap.find(".mute").addClass("muted");
        }

    }

    function padZero(value) {
        return value < 10 ? "0" + value : value;
    }

    function pauseSound() {
        audioWrap.find(".toggle").removeClass("playing");
        audio.pause();
    }

    function playSound() {
        audioWrap.find(".toggle").addClass("playing");
        audio.play();
    }

    function togglePlay(e) {
        if (audio.paused && !audio.ended) {
            playSound();
        } else if (audio.paused && audio.ended) {
            audio.currentTime = 0;

            playSound();
        } else {
            pauseSound();
        }

        audioWrap.find(".mute,.volume").removeClass("hidden");
        audioWrap.find(".progress").removeAttr("disabled");
    }

    function unmuteSound() {
        audioWrap.find(".mute").removeClass("muted");
        audio.muted = false;
    }

    function updateProgress(e) {
        audio.currentTime = $(e.target).val();
    }

    function updateTime() {
        var total = formatTime(audio.duration),
            current = formatTime(audio.currentTime);

        audioWrap.attr('style', `--seek-before-width: ${audio.currentTime / audio.duration * 100}%`);

        audioWrap.find(".time.current").text(current);
        audioWrap.find(".time.total").text(total);
        audioWrap
            .find(".progress")
            .val(audio.currentTime)
            .attr("max", audio.duration);

        if (audio.ended) pauseSound();
    }



    function updateVolume(e) {
        audio.volume = $(e.target).val() / 100;

        audio.volume === 0 ? muteSound() : unmuteSound();
    }

});

