function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
arr = [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20];
shuffle(arr);
arr.unshift(0);
arr[0]=17
i=0;
$(window).on('load', function() {

    $('.subscribeModal-lg').on('hidden.bs.modal', function (e) {
        $('.ketqua').prepend("<p class='font-weight-bold' style='font-size: 1.5em; color: darkcyan;'>Tổ thứ "+arr[i]+" đi trực thứ "+(i+1)+"</p>");
        i++;
    });


    $(".random-btn" ).click(function() {
        if(i<20){
            $(".tento").text("TỔ SỐ "+arr[i]);
            $(".thutu").text("Sẽ đi trực thứ "+(i+1));
            $('.subscribeModal-lg').modal('show');
        }
        
    });
});