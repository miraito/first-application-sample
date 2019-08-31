// キャラ用　dir 定数
var DOWN = 0;
var	LEFT = 1;
var	RIGHT = 2;
var	UP = 3;
var	STAY = 4;
// window　用　dir 定数
var OPEN = 0;
var CLOSE = 1;
var WAIT = 2;

enchant();
var game;
var battle = {
	flag : false,
	chara : new Array(),
	enemy : new Array(),
	info_label : {},
	view : 0,
}
var icon = {};
var player_turn; // ターンフェイズ管理

// 戦闘画面準備用グローバル変数
var window_image;
// 戦闘用配列格納変数
var arrange = {
	battlemap : [], // map上x,y軸管理配列
	chara : [],	// キャラ位置情報配列
	enemy : [],	// キャラ位置情報配列
	detect : [],	// 通行判定配列
	move : [],	// 各マス消費move値配列
	a_move : [], // 移動可能範囲配列
	e_move : [], // 敵キャラのmap上全ての位置に行くのに必要なmove値把握用配列(ai使用)
	dead : { p : [], e : [] }
}
var is_countup = true;　// 時間進行管理
var is_range = false; // 移動範囲出てるかフラグ
var is_att_range = false; // 攻撃範囲出てるかフラグ
var is_moveend_window = false; // moveend_window　が開いてるかフラグ
var is_action = false; // player 操作可能かどうかのフラグ
var is_info_window = false;
var is_status_window = false;

var move_tip = new Array();　// 移動範囲tip
var range_tip_a = new Array(); // 攻撃範囲tip

var select_chara; // クリックしたキャラ識別用

var battle_window; // バトル用window
var moveend_window; // 移動終了後のウィンドウ
var att_window = {dir:CLOSE}; // 攻撃キャンセル用window
var menu1_window;
var menu2_window;
var status_window;
var enemy_window;

var move_result = new Array()// 移動処理時の移動経路情報
var move_result_e = new Array()// 敵移動処理時の移動経路情報
var act_enemy = 0; // 行動済み敵キャラ番号
var performed = 0; // 行動済み人数管理変数

var end_mark = new Array();
var end_mark_e = new Array();

var life; //map画面ライフゲージ格納
var life_label // life_label

var div;

