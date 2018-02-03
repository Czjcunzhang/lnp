
//获取分词结果


var analysisUtil={
    //返回的结果文本
    result:[],
    getRemoteAnalysis:function(text){
        var _this=this;
        var response={};
       $.ajax({
           type:"POST",
           url:"http://119.23.24.250:9876/api/postag",
           dataType:"json",
           data: {content:text},
           async:false,
           success: function(res){
               response=res;
           }
        });


        _this.result=response.words;


        return response;
    },
    initResult:function(){

        var _this=this;
        $("#result-body").html("");


        $.each(this.result,function(){
            var html='<tr><td>'+this.desc+'</td><td>'+this.tag+'</td><td>'+this.word+'</td></tr>';

            $("#result-body").append(html);
        });


    },
    flush:function(){
        var remoteAnalysis=this.getRemoteAnalysis($("#txt-analysis").val());
        this.initResult();
    }



}



jQuery(function($) {

    $("#analysis-btn").click(function () {
        analysisUtil.flush();
    });

    analysisUtil.flush();

})