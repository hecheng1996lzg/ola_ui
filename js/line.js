/**
 * Created by HeCheng on 2017/8/2.
 */

function line() {

    var lines = [];

    /*
     * 发射一条线
     * 参数：对象{pa,pb}
     *   pa:起始点
     *   pb:目标点
     * */
    this.addLine = function (object) {
        var line = document.createElementNS('http://www.w3.org/2000/svg','rect');
        line.setAttribute('width',0);
        line.setAttribute('height',8);
        line.setAttribute('x',0);
        line.setAttribute('y',0);
        line.setAttribute('y',0);
        var svg=document.querySelector('svg');
        svg.appendChild(line);
        lines.push({
            pa: object.pa,
            pb: object.pb,
            dom: line,

            s: 2.8, //每帧移动距离
            p: 0,  //当前位置
            sp: 0.0036,  //每帧移动百分比距离
            pp:0,  //当前百分比位置
            lx:0,  //上一次x位置
            ly:0,  //上一次y位置

            mw: 140, //最大长度
            sw: 10,  //每帧长度改变值，默认10
        });

        this.rectActive(object.pa);
    }
    
    this.lineUpdate = function () {
        for (var i in lines){
            var line = lines[i];
            var pa = this.getOptions(line.pa);
            var pb = this.getOptions(line.pb);

            var path = $('#dir');
            var dArr = [
                'M',pa.s.x,pa.s.y,
                'L',pb.s.x,pb.s.y,
            ];
            path.attr('d',dArr.join(' '));

            var len = path[0].getTotalLength();
            line.p = Math.max(
                line.s+line.p ,
                line.pp*len);
            line.pp = line.p/len + line.sp;

            var point = path[0].getPointAtLength(line.p);
            var degree = Math.atan2(pb.s.x-pa.s.x,pa.s.y-pb.s.y)*180/Math.PI + 90;
            line.dom.setAttribute('transform', 'translate(0 -4) rotate('+degree+', '+point.x+' '+(point.y+4)+')');

            if(line.p<line.mw){
                line.dom.setAttribute('width',line.p);
            }

            var width = line.dom.getAttribute('width');
            if(line.p >= len){
                width = width-line.s<0? 0:width-line.s;
                line.dom.setAttribute('width',width);
                this.rectActive(line.pb);
            }
            if(line.p >= len && width<=0){
                $(line.dom).remove();
                lines.splice(i,1);
            }

            line.dom.setAttribute('x', point.x);
            line.dom.setAttribute('y', point.y);
            line.lx = point.x;
            line.ly = point.y;
        }
    }

}

