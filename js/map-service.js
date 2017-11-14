$(document).ready(function(){
    var divMap = document.getElementById( "map-GDS" );
    var svg = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
    var viewBoxHeight=615;
    var viewBoxWidth=1500;
    var newX=0;
    var newY=-10;
    createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
    moveMap();
    scrollSvg();
    zoomSvg();

    /**
     * 移动svg
     */
    function moveMap(){
        $(document).mousedown(function(event){
            $("#map-GDS").css("cursor", "move");
                /* 获取需要拖动节点的坐标 */
                var offset_x = newX;//x坐标
                var offset_y = newY;//y坐标
                /* 获取当前鼠标的坐标 */
                var mouse_x = event.pageX;
                var mouse_y = event.pageY;
                $(document).mousemove(function(ev){
                    /* 计算鼠标移动了的位置 */
                    var _x = ev.pageX - mouse_x;
                    var _y = ev.pageY - mouse_y;
                    /* 设置移动后的元素坐标 */
                    newX = (offset_x + _x );
                    newY = (offset_y + _y );
                /* 改变目标元素的位置 */
                createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                })
        });
        $(document).mouseup(function(){
            $("#map-GDS").css("cursor", "");
            $(this).unbind('mousemove');
        });
    }
    /**
     * 鼠标滚动上下方向
     */
    function scrollSvg(){
        // firefox
            document.body.addEventListener("DOMMouseScroll", function(event) {
                if(viewBoxWidth==1100)
                    viewBoxWidth=viewBoxWidth+100;
                if(viewBoxWidth==2900)
                    viewBoxWidth=viewBoxWidth-100;
                if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                     viewBoxWidth=event.detail && (event.detail > 0 ? viewBoxWidth-100 : viewBoxWidth+00);
                     createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                 }

            });
            // chrome and ie
            document.body.onmousewheel = function (event) {
               if(viewBoxWidth==1100)
                    viewBoxWidth=viewBoxWidth+100;
               if(viewBoxWidth==2900)
                    viewBoxWidth=viewBoxWidth-100;
               if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                 event = event || window.event;
                 viewBoxWidth= event.wheelDelta && (event.wheelDelta > 0 ? viewBoxWidth-100 : viewBoxWidth+100);
                 createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                }
            };

    }
    /**
     * 缩放按钮
     */
    function zoomSvg(){
        $(".zoomBig").on("click",function(){
            if(viewBoxWidth==1100)
                viewBoxWidth=viewBoxWidth+100;
            if(viewBoxWidth==2900)
                viewBoxWidth=viewBoxWidth-100;
            if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                 viewBoxWidth=viewBoxWidth-100;
                 createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
            }
        });
        $(".zoomSmall").on("click",function(){
            if(viewBoxWidth==1100)
                viewBoxWidth=viewBoxWidth+100;
            if(viewBoxWidth==2900)
                viewBoxWidth=viewBoxWidth-100;
            if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                 viewBoxWidth=viewBoxWidth+100;
                 createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
            }
        });
    }

    /**
     * 创建svg元素
     */
    function createSvg(newX,newY,viewBoxWidth,viewBoxHeight){
        svg.setAttribute("class", "GDS");
        svg.setAttribute("viewBox", "0,85,"+viewBoxWidth+","+viewBoxHeight);
        svg.setAttribute("transform", "translate("+ newX + ","+ newY + ")");
        divMap.appendChild(svg);
        createProvinceGD();
    }

    /**
     *省份
     */
    function createProvinceGD(){
        var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
        var path= document.createElementNS( "http://www.w3.org/2000/svg", "path" );
        svg.appendChild(g);
        path.setAttribute("class", "province-GD");
        path.setAttribute("d", map.province.path);
        path.setAttribute("value", map.province.provinceNme);
        g.appendChild(path);
        createCity();
    }

    /**
     * 市
     */
   function createCity(){
    for(var i=0;i<map.province.city.length;i++){
            var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
            var path= document.createElementNS( "http://www.w3.org/2000/svg", "path" );
            svg.appendChild(g);
            path.setAttribute("class", "colorChange");
            path.setAttribute("d", map.province.city[i].path);
            path.setAttribute("value", map.province.city[i].cityName);
            g.appendChild(path);
        }
        colorChangeMap();
    }

    /**
     * 鼠标移入移出地图样式改变
     */
    function colorChangeMap(){
        $(".colorChange").mouseover(function () {
              $(this).css({
                            "stroke":"#099",
                            "fill":"#099",
                            "cursor":"pointer",
                            "stroke-dasharray":""
                            });
              $(".testCity").append($(this).attr("value"));
              $(document).mousemove(function(e){
                        $(".map-tip").css({
                            "left":e.pageX-46+"px",
                            "top":e.pageY-95+"px",
                            "display":"block"
                        });
                    })
             });
            $(".colorChange").mouseout(function () {
                    $(this).css({
                                    "stroke":"#999",
                                    "fill":"transparent",
                                    "stroke-dasharray":"1,6"
                                });
                    $(".testCity").empty();
                    $(document).mousemove(function(e){
                                $(".map-tip").css({
                                    "display":"none"
                                });
                            })
             });
    }
})