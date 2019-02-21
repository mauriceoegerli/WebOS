function LoadAnimation(){
    this.percentage = 0;

    this.updateText = function(text){
        $("#load-text").prepend(`${text}<br/>`);
    };

    this.updateLoadingBar = function(newPercentage){
        let currentPercentage = this.percentage;
        let setPercentage = currentPercentage + newPercentage;
        this.percentage = setPercentage;
        $("#load-animation-filler").css("width", `${setPercentage}%`);
        $("#load-animation-percentage").text(`${setPercentage}%`);
    }

    this.finishLoading = function(){
        $("#load-animation-filler").css("width", '100%');
        $("#load-animation-percentage").text('100%');
        setTimeout(function(){
            $('.load-animation-page').addClass('loaded');
        }, 300);
    }
}

//# sourceURL=loader.js