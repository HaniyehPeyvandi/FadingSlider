$(function (){
    var stripWidth = 100;
    var stripHeight = 100;
    var stripWidthNumber = $(".container img").width() / stripWidth ;
    var stripHeightNumber = $(".container img").height() / stripHeight ;

    stripSlider();
    function stripSlider(){
        imgSrc = new Array();
        $(".container img").each(function (imgIndex , imgElement){
            imgSrc[imgIndex] = $(imgElement).attr("src");
        });
        $(".container img").remove();
        $(".container").append("<img/>")
        $(".container img").attr("src",imgSrc[0]);
        play_slider(0);
    }

    function play_slider(imgNo){
        if (imgNo >= imgSrc.length - 1){
            imgNo = -1;
        }
        strip(imgNo);
        fadeSlider($(".container img").last(),imgNo);
    }

    function fadeSlider(Item,imgNo){
        if ($(".container img").length > 2){
            $(Item).fadeOut(200 , function (){
                fadeSlider($(this).prev(),imgNo);
                $(this).remove();
            });
        }else {
            play_slider(imgNo + 1)
        }
    }

    function strip(imgNo){

        for(j=1 ; j<= stripWidthNumber ; j++){
            for(k=1 ; k<= stripHeightNumber ; k++) {
                $(".container").append("<img/>");
                $(".container img").last().attr("src",$(".container img").first().attr("src"));

                Right = j * stripWidth;
                Bottom = k * stripHeight;
                Left = Right - stripWidth;
                Top = Bottom - stripHeight;

                $(".container img").last().css("clip","rect("+Top+"px,"+Right+"px,"+Bottom+"px,"+Left+"px)");
            }
        }
        $(".container img").first().remove();
        $(".container img").first().before("<img/>");
        $(".container img").first().attr("src",imgSrc[imgNo+1]);
    }
});