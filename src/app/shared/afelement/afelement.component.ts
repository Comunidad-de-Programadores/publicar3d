import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { Router } from '@angular/router';
@Component({
  selector: 'app-afelement',
  templateUrl: './afelement.component.html',
  styleUrls: ['./afelement.component.css']
})
export class AfelementComponent implements OnInit {
  @Input() item: ElementId = 
  {name:"undefined",images:[{url:"",elements:[{url:"∫"}]}]} as ElementId;
  urlPhoto: string = '../../../assets/presets/pat0.patt';
  urls:string[] = [];
  tagNumberinit = 0;
  tagNumberend = 1;
  tagNumberlength = 1;
  currentMarkerIndex = 0;
  isSingleMarker:boolean = false;
  videoUrl: string= "https://firebasestorage.googleapis.com/v0/b/uptamira.appspot.com/o/undefined%20%2Ffotos.MP4?alt=media&token=7a6a4f38-47d0-4340-b436-a17d6147182a";
  modelName: string = "../../../assets/models/alien.glb"
  @ViewChild('markr', { static: false }) mrkDiv: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(private elementRef:ElementRef,
    private router: Router
  ) {}
  ngAfterViewInit() {
    
    var scene = this.elementRef.nativeElement.querySelector('.scene');
    
    for(var i=0; i<= this.tagNumberlength; i++)
		{
      var indexPath = +this.tagNumberinit+i;
			var url="../../../assets/presets/pat"+indexPath+".patt";
      var markerIndex = "marker_"+i;

			scene.insertAdjacentHTML('beforeend', 
      '<a-marker id="'+markerIndex+'" type="pattern" registerevents url="'+url+'"></a-marker>');
      var marker = this.elementRef.nativeElement.querySelector('#'+markerIndex+'');

      if(this.item.images![i].type == "video")
      {
        marker.id = "markervid_"+i;
        marker.title = "video"+indexPath;
        marker.insertAdjacentHTML('beforeEnd', 
        '<a-video class="clickable" gesture-handler="minScale: 0.25; maxScale: 10" id="videop'+indexPath+'" src="#video'+indexPath+'" width="3" height="2" position="0 0 0" rotation="270 0 0"></a-video>');
        console.log("asignando a marker: "+marker.id);
      
      }else if(this.item.images![i].type == "model"){
        //console.log("inserting model: "+this.item.images![i].value)
        // <a-asset-item *ngIf="image.type == 'model'" id="{{'model'+(i+tagNumberinit)}}" src="../../../assets/models/alien.glb"></a-asset-item>
        marker.insertAdjacentHTML('beforeEnd', 
        '<a-asset-item id="model'+indexPath+'" position="0 .1 0" rotation="0, 0, 0" src="'+this.item.images![i].value+'" ></a-asset-item>');
        marker.insertAdjacentHTML('beforeEnd', 
        '<a-gltf-model class="clickable" gesture-handler="minScale: 0.25; maxScale: 10" position="0 .1 0" rotation="0, 0, 0" src="#model'+indexPath+'" ></a-gltf-model>');
        //'<a-gltf-model position="0 .1 0" rotation="0, 0, 0" src="../../../assets/models/hover_board_low_poly.glb" ></a-gltf-model>');
      }else{
        var imgPath = "#img"+indexPath;
        if(this.isSingleMarker)
        imgPath = "multimarkerImg";

        var width = this.item.images![i].type =="poster" ? 2 : 3;
        var height = this.item.images![i].type =="vcard" ? 2 : 3;
        var xvalue = 0;
        var yvalue = 0;
        var entities ='';
         /* if(this.item.images![i].elements?.length!>0){
            for(var j=0; j< this.item.images![i].elements?.length!-2; j++){
              if(j%2!=0)
              {
                xvalue -= (2-j);
                yvalue += (2+j);
              }else{
                xvalue += (2+j);
                yvalue -= (2-j);
              }
               entities +='<a-entity position="'+xvalue+' 1 '+yvalue+'" template="src: #plane" data-src="#elem'+(j)+'" data-thumb="#elem'+(j)+'-thumb"></a-entity>' 
           
            }
             }*/
        
        marker.insertAdjacentHTML('beforeEnd', 
        entities+//'<a-entity position="0 1 0" template="src: #plane" data-src="#city'+i+'" data-thumb="#city'+i+'-thumb"></a-entity>');
        '<a-entity template="src: #plane" data-thumb="#img123" class="clickable" gesture-handler="minScale: 0.25; maxScale: 10" rotation="-90, 0, 0" geometry="primitive: plane; height: '+height+'; width: '+width+'" material="shader: flat; src: #img'+indexPath+'"></a-entity>');
        //'<a-image class="clickable" gesture-handler="minScale: 0.25; maxScale: 10" position="0 1 0" rotation="-90, 0, 0" src="#img'+indexPath+'" width="'+width+'" height="'+height+'"></a-image>');
      }
      
      
      
      //'<a-image position="0 .1 0" rotation="-90, 0, 0" src="#img'+indexPath+'" width="3" height="3"></a-image>');
     //'<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>');
    }
  }
  ngOnInit(): void {
   // console.log("AFELEMENT receiving"+JSON.stringify(this.item));
    this.urlPhoto = this.item.images![0].url!;
    
    this.tagNumberlength = this.item.images!.length !== undefined 
    && this.item.images!.length >0 ? this.item.images!.length-1:this.tagNumberlength;
    this.tagNumberinit = this.item.indexInit !== undefined 
    && this.item.images!.length >0 ? this.item.indexInit:this.tagNumberinit;
    this.tagNumberend = this.item.indexEnd !== undefined 
    && this.item.images!.length >0 ?this.item.indexEnd:this.tagNumberend;

    
    
  }
 
  homeAction(){
    //console.log("home action pressed");
    this.router.navigate(['/home?location=citnova'])
  .then(() => {
    window.location.reload();
  });
  }
  setMarkerIndex(){
    this.currentMarkerIndex = +(<HTMLInputElement> document.getElementById("imgIndex")).value;
    
    //console.log("marker value is: "+markerIndex+"currentmarkerindex: "+this.currentMarkerIndex);
  }
  setImage(url: string, index: number){
    //setting image
    console.log("setting index image: "+index);
    (<HTMLInputElement> document.getElementById("multimarkertest")).setAttribute("src",url);
    (<HTMLInputElement> document.getElementById("imgIndex")).value = index.toString();
   
    //this.item.images[0].url = url; 
  }
  resize(op: number){
    var currentWidth = (<HTMLElement> document.getElementById("multimarkertest")).getAttribute("width") != null ? 
    +(<HTMLElement> document.getElementById("multimarkertest")).getAttribute("width")!+0: 0;
    //setting image
    //console.log("setting image: "+; 
    //textEl.setAttribute('geometry',{width:'3', height:'3'});
    if(+currentWidth >= 2 && +currentWidth <= 6){
      //console.log("setting image width: "+(currentWidth+op)); 
      currentWidth = currentWidth < 3 ? 3: currentWidth;
      currentWidth = currentWidth > 5 ? 5: currentWidth;
      (<HTMLElement> document.getElementById("multimarkertest")).setAttribute("width",(currentWidth+op).toString() );
      (<HTMLElement> document.getElementById("multimarkertest")).setAttribute("height",(currentWidth+op).toString() );
    }
    
   
    //this.item.images[0].url = url; 
  }
}
