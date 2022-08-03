

export default class SliderProgressLine{
    private ref:HTMLElement;
    constructor(ref:HTMLElement) {
        this.ref = ref;
        
  }
   setWidth(left:number,right:number){
     this.ref.style.setProperty("--left", `${left}px`);
     this.ref.style.setProperty("--width", `${right-left}px`);
   }

   
}
