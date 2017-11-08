module appPet {
	export class MainPet extends lxlPet.CComponent {
		public constructor() {
			super(lxlPet.ConfigPet.SKIN_PATH + "MainPetSkin.exml");
		}

		private g_bigPet:lxlPet.ui.CGroup;
		private g_smallPet:lxlPet.ui.CGroup;
		private img_lino:eui.Image;
		private g_op:lxlPet.ui.CGroup;
		private btn_hi:lxlPet.ui.CButton;
		private btn_good:lxlPet.ui.CButton;
		private btn_bye:lxlPet.ui.CButton;
		private btn_video:lxlPet.ui.CButton;
		private mc_Big:egret.MovieClip;
		private mc_Small:egret.MovieClip;
		private _menuFlag:number = 0;
		private _video:egret.Video;
		private _txt:egret.TextField;

		onActivity(): void {
			super.onActivity();
			let info = lxlPet.Tool.callJS("getInfoToken");
			this._txt = new egret.TextField();
			this.addChild(this._txt);
			this._video = new egret.Video();
			this._video.visible = true;
			this._video.width = this.g_bigPet.width;
			this._video.height = this.g_bigPet.height;
			this._video.fullscreen = false;
			this._video.touchEnabled = true;
			this._video.poster = lxlPet.Tool.callJS("getURLPet") + "resource/assets/logo.png";
			this._video.addEventListener(egret.Event.COMPLETE, this._videoComplete, this);
			this._video.addEventListener(egret.IOErrorEvent.IO_ERROR, this._errorHandler, this);
			this._video.load("http://source.vipabc.com/ext/member/Website_data/mp4/124070/124070_1_1.mp4", true);//("resource/assets/demo.mp4", true);//
			// this.g_bigPet.addChild(this._video);
			if (info._userRole == "COORDINATOR") {
				Qipan.viewData.type = "showFrist";
				Qipan.viewData.gameIndex = 999;
				Qipan.dataHandler.sendMessageToServer(Qipan.viewData);
				this.img_lino.addEventListener(egret.TouchEvent.TOUCH_TAP, this._showMenu, this);
				this.btn_hi.addEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
				this.btn_good.addEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
				this.btn_bye.addEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
				this.btn_video.addEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
				this._video.addEventListener(egret.TouchEvent.TOUCH_TAP, this._playVideo, this);
			} else {
				this.g_op.visible = false;
				this.g_smallPet.visible = false;
				this.img_lino.visible = false;
				lxlPet.CDispatcher.getInstance().addListener(CustomEvent.MC, this._updateView, this);
			}
			lxlPet.Tool.callJS("loadGameComplete");
			// document.getElementsByClassName("pet-player")[0].style.zIndex = "3";
		}

		private _videoComplete(e:egret.Event) {
			this._video.removeEventListener(egret.Event.COMPLETE, this._videoComplete, this);
			this._video.removeEventListener(egret.IOErrorEvent.IO_ERROR, this._errorHandler, this);
		}

		private _updateHandler(e:egret.Event) {
			// this._txt.text = this._video.position + " " + this._video.length + " ";
		}

		private _errorHandler(e:egret.IOErrorEvent) {
			lxlPet.logs.log(e.data);
		}


		private _playVideo(e:egret.TouchEvent) {
			this._video.paused == true ? this._video.play() : this._video.pause();
			Qipan.viewData.mcPausd = this._video.paused;
		}

		private _updateView(e:lxlPet.CEvent) {
			let vd:ViewData = e.param as ViewData;
			this._showMC(vd.mcName, vd.mcPausd);
		}

		private _showMenu(e:egret.TouchEvent) {
			this._menuFlag = this._menuFlag == 0 ? 1 : 0;
			this.g_op.visible = this._menuFlag == 1 ? true : false;
		}

		private _showMC(mcname:string, pause:boolean = false) {
			if(mcname != "video") {
				this.g_bigPet.removeChildren();
				// this._video.visible = false;
				// this._video.paused == false ? this._video.pause():null;
				this.mc_Big = ResPet.getMovieClip(mcname + "_json", mcname + "_png", mcname);
				this.mc_Big.scaleX = 2;
				this.mc_Big.scaleY = 2;
				this.mc_Big.play(1);
				this.g_bigPet.addChild(this.mc_Big);
				this.mc_Big.once(egret.Event.COMPLETE, this._removeMC, this);
			} else {
				this.g_bigPet.addChild(this._video);
				this._video.visible = true;
				pause == false ? this._video.play() : this._video.pause();
				this._video.addEventListener(egret.Event.ENTER_FRAME, this._updateHandler, this);
			}
		}

		private _onGetComplete(e:egret.Event) {
			let r = e.currentTarget;
			// this._video = new egret.Video()
		}

		private _onGetIOError(e:egret.IOErrorEvent) {
			lxlPet.logs.log("error:" + e);
		}

		private _removeMC(e:egret.Event) {
			setTimeout(()=>{
				this.g_bigPet.removeChildren();
			}, 500);
		}

		private _changeMC(e:egret.TouchEvent) {
			this._showMC(e.currentTarget.name);
			this._showMenu(e);
			Qipan.viewData.mcName = e.currentTarget.name;
			Qipan.dataHandler.linkLine(Qipan.viewData);
		}

		dispose() {
			super.dispose();
			let info = lxlPet.Tool.callJS("getInfoToken");
			if (info._userRole == "COORDINATOR") {
				this.img_lino.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._showMenu, this);
				this.btn_hi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
				this.btn_good.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
				this.btn_bye.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
			} else {
				lxlPet.CDispatcher.getInstance().removeListener(CustomEvent.MC, this._updateView, this);
			}
		}

	}
}