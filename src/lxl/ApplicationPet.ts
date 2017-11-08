module lxlPet {
    export class ApplicationPet extends ui.CLayer {
        public loading;
        public root:ui.CLayer;
        public shape:egret.Shape;
        private _logo:eui.Image;
        public preURL:string;

        public constructor() {
            super();
            
        }

        onActivity():void {
            super.onActivity();
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            this.root = new ui.CLayer();
            this.shape = new egret.Shape();
            this._logo = new eui.Image();
            let assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

            this.addEventListener(egret.Event.RESIZE, this._resizeHandler, this);
            
            ResPet.addListener(CEvent.LOAD_CONFIG_COMPLETE_PET, this._conConfigComplete, this);
            this.preURL = lxlPet.Tool.callJS("getURLPet");
            ResPet.loadConfig(this.preURL +"resource/default.res.json", this.preURL + "resource/");
        }

        private _conConfigComplete(event:RES.ResourceEvent):void {
            ResPet.removeListener(CEvent.LOAD_CONFIG_COMPLETE_PET, this._conConfigComplete, this);
            
            //加在皮肤主题配置文件，可以手动覆盖这个文件，替换默认皮肤
            let theme = new eui.Theme(this.preURL + "resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            ResPet.addListener(CEvent.LOAD_GROUP_COMPLETE_PET, this._onResourceLoadComplete, this);
            ResPet.loadGroup("preload");
        }

        private _resizeHandler(event:egret.Event):void {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0x996600);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        }

        private isThemeLoadEnd:boolean = false;

        private onThemeLoadComplete(e:eui.UIEvent):void {
            this.isThemeLoadEnd = true;
            this.createScene();
        }

        private isResourceLoadEnd:boolean = false;
        private _onResourceLoadComplete(e:CEvent):void {
            if("preload" == e.data.groupName) {
                this.loading = new LoadingUI();
                this.loading.width = this.width;
                this.loading.height = this.height;
                this.loading.createView();
                this.stage.addChild(this.loading);
                ResPet.addListener(CEvent.LOAD_PROGRESS_PET, this._onResourceProgress, this);
                ResPet.loadGroup("mainpet");
            } else {
                egret.Tween.get( this.loading)
                    .to( {alpha: 0}, 1000)
                    .call(this.resourceComplete, this);    
            }
        }

        private resourceComplete():void {
            this.stage.removeChild(this.loading);
            this.isResourceLoadEnd = true;
            
            this.createScene();
            ResPet.removeListener(CEvent.LOAD_GROUP_COMPLETE_PET, this._onResourceLoadComplete, this);
        }

        private _onResourceProgress(e:CEvent):void {
            this.loading.setProgress(e.data.itemsLoaded, e.data.itemsTotal);
        }


        private createScene():void {
            if(this.isThemeLoadEnd && this.isResourceLoadEnd){
                this.startPet();
                this.root.delegate = this;
                this.stage.addChild(this.root);
                this._logo.source = "img_logo_png";
                this._logo.x = 10;
                this._logo.y = 10;
                this.stage.addChild(this._logo);
                if(egret.Capabilities.runtimeType == "web")
                    document.onkeydown = this.keyDownHandler;
                this.shape.graphics.beginFill(0x996600);
                this.shape.graphics.drawRect(0, 0, this.width, this.height);
                this.shape.graphics.endFill();
                this.shape.alpha = 0;
                this.shape.visible = false;
                this.stage.addChild(this.shape);
                Toast.getInstance().init(this, ResPet.getRes("full1_png"));
                lxlPet.CDispatcher.getInstance().addListener(lxlPet.CEvent.EYE_CHANGE_PET, this.changeModel, this);
            }
        }

        private keyDownHandler(ev:KeyboardEvent):any {
            switch (ev.keyCode) {
                case 32:
                    CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.SPACE_PET, "space"));
                break;
                case 37:
                    CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.LEFT_PET, "left"));
                break;
                case 38:
                    CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.UP_PET, "up"));
                break;
                case 39:
                    CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.RIGHT_PET, "right"));
                break;
                case 40:
                    CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.DOWN_PET, "down"));
                break;
            }
        }

        private changeModel(e:CEvent):void {
            if(this.shape.visible == false) {
                this.shape.alpha = 0;
                this.shape.visible = true;
                egret.Tween.get(this.shape)
                    .to( { alpha: 0.35 }, 1000, egret.Ease.quadOut  ).call(()=>{
                        CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.PROTECTE_EYE_PET, 1));
				});
            } else {
                egret.Tween.get(this.shape)
                    .to( { alpha: 0 }, 1000, egret.Ease.quintIn  ).call( ()=>{
                        this.shape.visible = false;
                        CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.PROTECTE_EYE_PET, 0));
				} );
            }
        }

        protected startPet():void {

        }

        
    }
    
}