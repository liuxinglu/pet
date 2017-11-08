var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxlPet;
(function (lxlPet) {
    var ConfigPet = (function () {
        function ConfigPet() {
        }
        return ConfigPet;
    }());
    //动画前置路径
    ConfigPet.MC_PATH = "resource/assets/mc/";
    ConfigPet.SKIN_PATH = "resource/app_skins/";
    ConfigPet.GRID_SIZE = 40;
    lxlPet.ConfigPet = ConfigPet;
    __reflect(ConfigPet.prototype, "lxlPet.ConfigPet");
})(lxlPet || (lxlPet = {}));
//# sourceMappingURL=ConfigPet.js.map