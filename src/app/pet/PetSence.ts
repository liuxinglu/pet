module appPet {
	export class PetSence extends lxlPet.ui.CLayer{
		public constructor() {
			super();
		}

		onActivity():void {
			super.onActivity();
			let v:egret.Video
			let main:MainPet = new appPet.MainPet();
			main.width = this.stage.stageWidth;
			main.height = this.stage.stageHeight;
			main.addEventListener(lxlPet.CEvent.LOAD_SKIN_COMPLETE_PET, ()=>{
				this.addChild(main);
			}, this);
		}
	}
}