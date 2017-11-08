module lxlPet {
	export class CEventInit implements EventInit {
		bubbles: boolean;
		cancelable: boolean;
	}

	export class CEvent extends egret.Event{
		/**
		 *连接到服务器 
		 */		
		public static CONNECT_SERVER_PET:string = "CEVENT::CONNECT_SERVER_PET";
		
		/**
		 *连接失败 
		 */		
		public static CONNECT_FAIL_PET:string = "CEVENT::CONNECT_FAIL_PET";

		/**
		 *加载资源完成 
		 */		
		public static LOAD_SKIN_COMPLETE_PET:string = "CEVENT::LOAD_SKIN_COMPLETE_PET";
		/**
		 * 加载配置完成
		 */
		public static LOAD_CONFIG_COMPLETE_PET:string = "CEVENT::LOAD_CONFIG_COMPLETE_PET";
		/**
		 * 加载一组资源完成
		 */
		public static LOAD_GROUP_COMPLETE_PET:string = "CEVENT::LOAD_GROUP_COMPLETE_PET";
		/**
		 * 加载进度
		 */
		public static LOAD_PROGRESS_PET:string = "CEVENT::LOAD_PROGRESS_PET";

		public static PRE_CLICK_PET:string = "CEVENT::PRE_CLICK_PET";
		public static CLICK_PET:string = "CEVENT::CLICK_PET";

		//完成选择
		public static SEL_COMPLETE_PET:string = "CEVENT::SEL_COMPLETE";
		//成功完成游戏
		public static SUCCESS_PET:string = "CEVENT::SUCCESS";
		//返回
		public static BACK_PET:string = "CEVENT::BACK";
		//左右上下
		public static UP_PET:string = "CEVENT::UP";
		public static DOWN_PET:string = "CEVENT::DOWN";
		public static LEFT_PET:string = "CEVENT::LEFT";
		public static RIGHT_PET:string = "CEVENT::RIGHT";
		public static SPACE_PET:string = "CEVENT::SPACE";
		//护眼模式
		public static PROTECTE_EYE_PET:string = "CEVENT::PROTECTE_EYE";
		public static EYE_CHANGE_PET:string = "CEVENT::EYE_CHANGE";

		public static GET_MESSAGE_FROM_SERVER_PET:string = "CEVENT::GET_MESSAGE_FROM_SERVER_PET";
		public static GET_STUDENTS_FROM_SERVER_PET:string = "CEVENT::GET_USERLIST_FROM_SERVER_PET";
		public static GET_TEACHER_FROM_SERVER_PET:string = "CEVENT::GET_TEACHER_FROM_SERVER_PET";
		public static GET_MESSAGE_PET:string = "CEVENT::GET_MESSAGE_PET";
		public static GET_LIST_PET:string = "CEVENT::GET_STUDENTS_PET";
		public static GET_TEACHER_PET:string = "CEVENT::GET_TEACHER_PET";
		public static GET_USER_LIST_PET:string = "CEVENT::GET_USER_LIST_PET";//获取用户列表 包含老师
		public static SEL_DEFENDER_PET:string = "CEVENT::SEL_DEFENDER_PET";//选择防守方
		public static SEL_DEFENDER_COMPLETE_PET:string = "CEVENT::SEL_DEFENDER_COMPLETE_PET";
		public static LINK_LINE_PET:string = "CEVENT::LINK_LINE_PET";//连线
		public static CLEAR_LINE_PET:string = "CEVENT::CLEAR_LINE_PET";//清空连线
		public static OPEN_PET:string = "CEVENT::OPEN_PET";
		public static READONLY_CHANGE_PET:string = "READONLY_CHANGE_PET";
		private _param:any;
		cancelBubble;
		public constructor(type:string, param:any = null, timeSpan:number = 0, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, bubbles, cancelable, param);
			// let ceinit:CEventInit = new CEventInit();
			// ceinit.bubbles = bubbles;
			// ceinit.cancelable = cancelable;
			this._param = param;
		}

		public get param():any {
			return this._param;
		}

	}
}