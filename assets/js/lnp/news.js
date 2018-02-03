
//获取分词结果


var analysisUtil={
    //返回的结果文本
    result:"",
    getRemoteAnalysis:function(text){
        var _this=this;
        var response={};
       $.ajax({
           type:"POST",
           url:"http://119.23.24.250:9876/api/news_abstractor",
           dataType:"json",
           data: {content:text},
           async:false,
           success: function(res){
               response=res;
           }
        });


        _this.result=response.data;


        return response;
    },
    initResult:function(){

        var _this=this;
        $("#reslut-page").html(this.result);

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