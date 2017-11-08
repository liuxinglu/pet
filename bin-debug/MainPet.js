var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResPet = lxlPet.GlobalData.getInstance().resManager;
var Qipan = appPet.PetManager.getInstance();
var MainPet = (function (_super) {
    __extends(MainPet, _super);
    function MainPet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    MainPet.prototype.startPet = function () {
        _super.prototype.startPet.call(this);
        this.root = new appPet.PetSence();
        lxlPet.GlobalData.getInstance().root = this;
        this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
    };
    MainPet.getInstance = function () {
        if (this.instance == null)
            this.instance = new MainPet();
        return this.instance;
    };
    return MainPet;
}(lxlPet.ApplicationPet));
__reflect(MainPet.prototype, "MainPet");
//# sourceMappingURL=MainPet.js.map