var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxlPet;
(function (lxlPet) {
    var ApplicationPet = (function (_super) {
        __extends(ApplicationPet, _super);
        function ApplicationPet() {
            var _this = _super.call(this) || this;
            _this.isThemeLoadEnd = false;
            _this.isResourceLoadEnd = false;
            return _this;
        }
        ApplicationPet.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            this.root = new lxlPet.ui.CLayer();
            this.shape = new egret.Shape();
            this._logo = new eui.Image();
            var assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            this.addEventListener(egret.Event.RESIZE, this._resizeHandler, this);
            ResPet.addListener(lxlPet.CEvent.LOAD_CONFIG_COMPLETE_PET, this._conConfigComplete, this);
            this.preURL = lxlPet.Tool.callJS("getURLPet");
            ResPet.loadConfig(this.preURL + "resource/default.res.json", this.preURL + "resource/");
        };
        ApplicationPet.prototype._conConfigComplete = function (event) {
            ResPet.removeListener(lxlPet.CEvent.LOAD_CONFIG_COMPLETE_PET, this._conConfigComplete, this);
            //加在皮肤主题配置文件，可以手动覆盖这个文件，替换默认皮肤
            var theme = new eui.Theme(this.preURL + "resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            ResPet.addListener(lxlPet.CEvent.LOAD_GROUP_COMPLETE_PET, this._onResourceLoadComplete, this);
            ResPet.loadGroup("preload");
        };
        ApplicationPet.prototype._resizeHandler = function (event) {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0x996600);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        };
        ApplicationPet.prototype.onThemeLoadComplete = function (e) {
            this.isThemeLoadEnd = true;
            this.createScene();
        };
        ApplicationPet.prototype._onResourceLoadComplete = function (e) {
            if ("preload" == e.data.groupName) {
                this.loading = new lxlPet.LoadingUI();
                this.loading.width = this.width;
                this.loading.height = this.height;
                this.loading.createView();
                this.stage.addChild(this.loading);
                ResPet.addListener(lxlPet.CEvent.LOAD_PROGRESS_PET, this._onResourceProgress, this);
                ResPet.loadGroup("mainpet");
            }
            else {
                egret.Tween.get(this.loading)
                    .to({ alpha: 0 }, 1000)
                    .call(this.resourceComplete, this);
            }
        };
        ApplicationPet.prototype.resourceComplete = function () {
            this.stage.removeChild(this.loading);
            this.isResourceLoadEnd = true;
            this.createScene();
            ResPet.removeListener(lxlPet.CEvent.LOAD_GROUP_COMPLETE_PET, this._onResourceLoadComplete, this);
        };
        ApplicationPet.prototype._onResourceProgress = function (e) {
            this.loading.setProgress(e.data.itemsLoaded, e.data.itemsTotal);
        };
        ApplicationPet.prototype.createScene = function () {
            if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
                this.startPet();
                this.root.delegate = this;
                this.stage.addChild(this.root);
                this._logo.source = "img_logo_png";
                this._logo.x = 10;
                this._logo.y = 10;
                this.stage.addChild(this._logo);
                if (egret.Capabilities.runtimeType == "web")
                    document.onkeydown = this.keyDownHandler;
                this.shape.graphics.beginFill(0x996600);
                this.shape.graphics.drawRect(0, 0, this.width, this.height);
                this.shape.graphics.endFill();
                this.shape.alpha = 0;
                this.shape.visible = false;
                this.stage.addChild(this.shape);
                lxlPet.Toast.getInstance().init(this, ResPet.getRes("full1_png"));
                lxlPet.CDispatcher.getInstance().addListener(lxlPet.CEvent.EYE_CHANGE_PET, this.changeModel, this);
            }
        };
        ApplicationPet.prototype.keyDownHandler = function (ev) {
            switch (ev.keyCode) {
                case 32:
                    lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.SPACE_PET, "space"));
                    break;
                case 37:
                    lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.LEFT_PET, "left"));
                    break;
                case 38:
                    lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.UP_PET, "up"));
                    break;
                case 39:
                    lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.RIGHT_PET, "right"));
                    break;
                case 40:
                    lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.DOWN_PET, "down"));
                    break;
            }
        };
        ApplicationPet.prototype.changeModel = function (e) {
            var _this = this;
            if (this.shape.visible == false) {
                this.shape.alpha = 0;
                this.shape.visible = true;
                egret.Tween.get(this.shape)
                    .to({ alpha: 0.35 }, 1000, egret.Ease.quadOut).call(function () {
                    lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.PROTECTE_EYE_PET, 1));
                });
            }
            else {
                egret.Tween.get(this.shape)
                    .to({ alpha: 0 }, 1000, egret.Ease.quintIn).call(function () {
                    _this.shape.visible = false;
                    lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.PROTECTE_EYE_PET, 0));
                });
            }
        };
        ApplicationPet.prototype.startPet = function () {
        };
        return ApplicationPet;
    }(lxlPet.ui.CLayer));
    lxlPet.ApplicationPet = ApplicationPet;
    __reflect(ApplicationPet.prototype, "lxlPet.ApplicationPet");
})(lxlPet || (lxlPet = {}));
//# sourceMappingURL=ApplicationPet.js.map