var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appPet;
(function (appPet) {
    var DataHandler = (function () {
        function DataHandler() {
        }
        DataHandler.prototype.sendMessageToServer = function (vd) {
            var tempvd = lxlPet.Tool.copyObject(vd);
            var o = { action: 'publicMessage', data: tempvd };
            lxlPet.Tool.callJS("sendMsg", o);
        };
        DataHandler.prototype.linkLine = function (d) {
            var obj = { type: 'mc', data: d };
            this.sendMessageToServer(obj);
        };
        DataHandler.prototype._getMC = function (data) {
            lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(appPet.CustomEvent.MC, data));
        };
        DataHandler.prototype.getMessageFromServer = function (data) {
            lxlPet.logs.log("getMessageFromServer " + data);
            switch (data.type) {
                case "mc":
                    this._getMC(data.data);
                    break;
            }
        };
        DataHandler.prototype.setStudentsFromServer = function (data) {
            lxlPet.logs.log("students:" + data);
            lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.GET_STUDENTS_FROM_SERVER_PET, data));
        };
        DataHandler.prototype.setTeacherFromServer = function (data) {
            lxlPet.logs.log("teacher:" + data);
            lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.GET_TEACHER_FROM_SERVER_PET, data));
        };
        DataHandler.prototype.getWordsFromServer = function () {
        };
        return DataHandler;
    }());
    appPet.DataHandler = DataHandler;
    __reflect(DataHandler.prototype, "appPet.DataHandler");
})(appPet || (appPet = {}));
//# sourceMappingURL=DataHandler.js.map