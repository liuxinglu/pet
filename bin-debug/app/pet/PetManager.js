var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appPet;
(function (appPet) {
    var PetManager = (function () {
        function PetManager() {
            this.viewData = new appPet.ViewData();
            this.dataHandler = new appPet.DataHandler();
            this.dataArr = [];
        }
        PetManager.getInstance = function () {
            if (this._qipan == null)
                this._qipan = new PetManager();
            return this._qipan;
        };
        return PetManager;
    }());
    appPet.PetManager = PetManager;
    __reflect(PetManager.prototype, "appPet.PetManager");
})(appPet || (appPet = {}));
//# sourceMappingURL=PetManager.js.map