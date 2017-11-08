var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appPet;
(function (appPet) {
    var CustomEvent = (function () {
        function CustomEvent() {
        }
        return CustomEvent;
    }());
    CustomEvent.MC = "CEVENT::MC"; //连线
    appPet.CustomEvent = CustomEvent;
    __reflect(CustomEvent.prototype, "appPet.CustomEvent");
})(appPet || (appPet = {}));
//# sourceMappingURL=CustomEvent.js.map