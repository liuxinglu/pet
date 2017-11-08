var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appPet;
(function (appPet) {
    var ViewData = (function () {
        function ViewData() {
            this.type = ""; //show normal
            this.gameIndex = 0;
            this.mcName = "";
            this.mcPausd = false;
        }
        return ViewData;
    }());
    appPet.ViewData = ViewData;
    __reflect(ViewData.prototype, "appPet.ViewData");
})(appPet || (appPet = {}));
//# sourceMappingURL=ViewData.js.map