function Lockscreen(){
    this.loadLockScreen = function(){
        $('#home-screen').on('dblclick', function(){
            $('.lockscreen-cover').addClass('locked');
        });

        $('.lockscreen-cover').on('dblclick', function(){
            $('.lockscreen-cover').addClass('unlocked');
            setTimeout(function(){
                $('.lockscreen-cover').removeClass('unlocked');
                $('.lockscreen-cover').removeClass('locked');
            }, 800);
        });
    }
}

//# sourceURL=lockscreen.js