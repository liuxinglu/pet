var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var appPet;
(function (appPet) {
    var MainPet = (function (_super) {
        __extends(MainPet, _super);
        function MainPet() {
            var _this = _super.call(this, lxlPet.ConfigPet.SKIN_PATH + "MainPetSkin.exml") || this;
            _this._menuFlag = 0;
            return _this;
        }
        MainPet.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            var info = lxlPet.Tool.callJS("getInfoToken");
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
            this._video.load("http://source.vipabc.com/ext/member/Website_data/mp4/124070/124070_1_1.mp4", true); //("resource/assets/demo.mp4", true);//
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
            }
            else {
                this.g_op.visible = false;
                this.g_smallPet.visible = false;
                this.img_lino.visible = false;
                lxlPet.CDispatcher.getInstance().addListener(appPet.CustomEvent.MC, this._updateView, this);
            }
            lxlPet.Tool.callJS("loadGameComplete");
            // document.getElementsByClassName("pet-player")[0].style.zIndex = "3";
        };
        MainPet.prototype._videoComplete = function (e) {
            this._video.removeEventListener(egret.Event.COMPLETE, this._videoComplete, this);
            this._video.removeEventListener(egret.IOErrorEvent.IO_ERROR, this._errorHandler, this);
        };
        MainPet.prototype._updateHandler = function (e) {
            // this._txt.text = this._video.position + " " + this._video.length + " ";
        };
        MainPet.prototype._errorHandler = function (e) {
            lxlPet.logs.log(e.data);
        };
        MainPet.prototype._playVideo = function (e) {
            this._video.paused == true ? this._video.play() : this._video.pause();
            Qipan.viewData.mcPausd = this._video.paused;
        };
        MainPet.prototype._updateView = function (e) {
            var vd = e.param;
            this._showMC(vd.mcName, vd.mcPausd);
        };
        MainPet.prototype._showMenu = function (e) {
            this._menuFlag = this._menuFlag == 0 ? 1 : 0;
            this.g_op.visible = this._menuFlag == 1 ? true : false;
        };
        MainPet.prototype._showMC = function (mcname, pause) {
            if (pause === void 0) { pause = false; }
            if (mcname != "video") {
                this.g_bigPet.removeChildren();
                // this._video.visible = false;
                // this._video.paused == false ? this._video.pause():null;
                this.mc_Big = ResPet.getMovieClip(mcname + "_json", mcname + "_png", mcname);
                this.mc_Big.scaleX = 2;
                this.mc_Big.scaleY = 2;
                this.mc_Big.play(1);
                this.g_bigPet.addChild(this.mc_Big);
                this.mc_Big.once(egret.Event.COMPLETE, this._removeMC, this);
            }
            else {
                this.g_bigPet.addChild(this._video);
                this._video.visible = true;
                pause == false ? this._video.play() : this._video.pause();
                this._video.addEventListener(egret.Event.ENTER_FRAME, this._updateHandler, this);
            }
        };
        MainPet.prototype._onGetComplete = function (e) {
            var r = e.currentTarget;
            // this._video = new egret.Video()
        };
        MainPet.prototype._onGetIOError = function (e) {
            lxlPet.logs.log("error:" + e);
        };
        MainPet.prototype._removeMC = function (e) {
            var _this = this;
            setTimeout(function () {
                _this.g_bigPet.removeChildren();
            }, 500);
        };
        MainPet.prototype._changeMC = function (e) {
            this._showMC(e.currentTarget.name);
            this._showMenu(e);
            Qipan.viewData.mcName = e.currentTarget.name;
            Qipan.dataHandler.linkLine(Qipan.viewData);
        };
        MainPet.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var info = lxlPet.Tool.callJS("getInfoToken");
            if (info._userRole == "COORDINATOR") {
                this.img_lino.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._showMenu, this);
                this.btn_hi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
                this.btn_good.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
                this.btn_bye.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._changeMC, this);
            }
            else {
                lxlPet.CDispatcher.getInstance().removeListener(appPet.CustomEvent.MC, this._updateView, this);
            }
        };
        return MainPet;
    }(lxlPet.CComponent));
    appPet.MainPet = MainPet;
    __reflect(MainPet.prototype, "appPet.MainPet");
})(appPet || (appPet = {}));
//# sourceMappingURL=MainPet.js.map