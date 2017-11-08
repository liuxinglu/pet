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
    var PetSence = (function (_super) {
        __extends(PetSence, _super);
        function PetSence() {
            return _super.call(this) || this;
        }
        PetSence.prototype.onActivity = function () {
            var _this = this;
            _super.prototype.onActivity.call(this);
            var v;
            var main = new appPet.MainPet();
            main.width = this.stage.stageWidth;
            main.height = this.stage.stageHeight;
            main.addEventListener(lxlPet.CEvent.LOAD_SKIN_COMPLETE_PET, function () {
                _this.addChild(main);
            }, this);
        };
        return PetSence;
    }(lxlPet.ui.CLayer));
    appPet.PetSence = PetSence;
    __reflect(PetSence.prototype, "appPet.PetSence");
})(appPet || (appPet = {}));
//# sourceMappingURL=PetSence.js.map