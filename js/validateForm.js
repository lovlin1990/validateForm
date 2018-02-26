/*
 * 校验主函数:
 * 调用例子
 * $("#id").formValidate({
		rules: {
			id属性: {
				validateNull: true,//(校验方法名：true为校验false不校验)
				validateMsgLength: true,
				validateTrueName: true
		    }
		},
		messages: {
			id属性: {
				validateNull: "提示的错误信息",
				validateMsgLength: "提示的错误信息",
				validateTrueName: "提示的错误信息"
		    }
		}
	});
 * rules:为id属性
 * messages:为错误提示的信息
 * isNotSubmitForm:为不交表单，用于分页校验
 * 可以新增校验方法：id为rules里的id，msg提示的错误信息
 * 注意新增方法需要提示信息的，必须返回true；
 * 新增的方法写到自己的js里，这里写的都是通用的，不要乱写
 * jQuery.fn.方法名 = function(id,msg){};
 * 1.校验规则
 * （1）如果校验最大长度，在input里配置data-length=""
 * （2）如果校验区间长度，在input里配置，例：data-range="6-16"
 * （3）如果两个input值是否一样，在input里配置，例：data-equalID="abc"
 * 
 * */
var validateResult = false;
var errorElement = false;
var errorElementId = "";
jQuery.fn.formValidate=function(opt) {
	var result = false;
	var errorId = opt.errorElement;
	var isNotSubmitForm = opt.isNotSubmitForm;
	validateResult = false;
	errorElement = false;
	errorElementId = "";
	if(errorId != null){
		errorElement = true;
		errorElementId = errorId;
	}
    var rules = opt.rules;
    var messages = opt.messages;
    for(var i in rules){
    	for(var j in rules[i]){
    		if(rules[i][j]){
    			var msg = messages[i][j];
    			result = $(this)[j](i,msg);
    			if(result){
    				if($("#" + i)[0].tagName.toLowerCase() == 'input'){
    					$("#" + i).focus();
    				}
    				return ;
    			}
    		}
        }
    }
    if(!result){
    	if(!!!isNotSubmitForm){
    		$(this).submit();
    		v.showMask();
    	}
    	validateResult = true;
    }
};
//校验是否为空
jQuery.fn.validateNull = function(id,msg){
	if($("#"+id).val() === null || $("#"+id).val() == ""){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验富文本是否为空
jQuery.fn.validateEditNull = function(id,msg){
    if($("#"+id).val() === null || $("#"+id).val() == "" || $("#"+id).val() == "<p><br></p>"){
        if(errorElement){
            showMsg(msg, 'danger',id);
        } else {
            layer.msg(msg,{time: 2000});
        }
        return true;
    } else {
        return false;
    }
};
//校验是否为0
jQuery.fn.validateZero = function(id,msg){
	var val = $("#"+id).val();
	if(val.indexOf(",") > -1){
	    var reg = new RegExp(",","g");
        val = val.replace(reg,"");
	}
    if(Number(val) === 0){
        if(errorElement){
            showMsg(msg, 'danger',id);
        } else {
            layer.msg(msg,{time: 2000});
        }
        return true;
    } else {
        return false;
    }
};
//校验区间长度（*条件为在input中加入例：data-range="6-16"的属性）
jQuery.fn.validateRangeLength = function(id,msg){
	var value = $("#"+id).val();
	//var vl = v.getStrLeng(value);
	var vl = value.length;
	var rl = $("#"+id).attr("data-range");
	var ls = rl.split("-");
	var result = false;
	if(!(vl >= ls[0] && ls[1] >= vl)){
		result = true;
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
	}
	return result;
};
//校验值的范围（*条件为在input中加入例：data-rangeVal="0-10"的属性）
jQuery.fn.validateRangeVal = function(id,msg){
	var vl = $("#"+id).val();
	//var vl = v.getStrLeng(value);
	var rl = $("#"+id).attr("data-rangeVal");
	var ls = rl.split("-");
	var result = false;
	if(!(Number(vl) >= Number(ls[0]) && Number(ls[1]) >= Number(vl))){
		result = true;
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
	}
	return result;
};
//校验两个input框输入值是否一样（*条件为在input中加入例：data-equalID="abc"的属性）
jQuery.fn.validateTwoPwd = function(id,msg){
	var value = $("#"+id).val();
	var inputId = $("#"+id).attr("data-equalID");
	var inputValue = $("#"+inputId).val();
	var result = false;
	if(value !== inputValue){
		result = true;
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
	}
	return result;
};
//校验两个input框至少输入一个（*条件为在input中加入例：data-atLeastOne="abc"的属性）
jQuery.fn.validateAtLeastOne = function (id, msg) {
    //var value = $("#" + id).val();
    var anotherId = $("#" + id).attr("data-atLeastOne");
    //var anotherValue = $("#" + anotherId).val();
    var result = true;
    if (jQuery.fn.validateNull(id,"") && jQuery.fn.validateNull(anotherId,"")) {
        if (errorElement) {
            showMsg(msg, 'danger', errorElementId);
        } else {
            layer.msg(msg, {time: 2000});
        }
    } else {
        result = false;
    }
    return result;
};

//校验长度（*条件为在input中加入data-length=“”的属性）
jQuery.fn.validateMsgLength = function(id,msg){
	var value = $("#"+id).val();
	var l1 = value.length;
	var l2 = $("#"+id).attr("data-length");
	var result = false;
	if(l1 > l2){
		result = true;
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
	}
	return result;
};
//校验用户名必须包含一个字母
jQuery.fn.validateIncludeLetter = function(id,msg){
	var value = $("#"+id).val();
	var cName = new RegExp("[a-zA-Z]");
	if(value.trim() != "" && !cName.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验真实名字（只能为汉字）
jQuery.fn.validateTrueName = function(id,msg){
	var value = $("#"+id).val();
	var cName = /^([\u4e00-\u9fa5]{2,4})$/;
	if(value.trim() != "" && !cName.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验身份证号
jQuery.fn.validateIDcard = function(id,msg){
	var value = $("#"+id).val();
	var result = v.validateIDCard(value);
	if(value.trim() != "" && !result){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验手机号
jQuery.fn.validateTel = function(id,msg){
	var value = $("#"+id).val();
	var tel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
	if(value.trim() != "" && !tel.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验手数字字母横杠-
jQuery.fn.validateNumZimuHg = function(id,msg){
	var value = $("#"+id).val();
	var reg =/[A-Za-z0-9-]+$/;
	if(value.trim() != "" && !reg.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验手QQ
jQuery.fn.validateQQ = function(id,msg){
	var value = $("#"+id).val();
	var qq = /^[1-9]\d{4,10}$/;
	if(value.trim() != "" && !qq.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验email
jQuery.fn.validateEmail = function(id,msg){
	var value = $("#"+id).val();
	var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if(value != "" && !email.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验邮政编码
jQuery.fn.validatePostalCode = function(id,msg){
	var value = $("#"+id).val();
	var code = /^[a-zA-Z0-9 ]{3,12}$/;
	if(value != "" && !code.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验普通电话
jQuery.fn.validateNormalTel = function(id,msg){
	var value = $("#"+id).val();
	var code =/^([0-9]{3,4}-)?[0-9]{7,8}$/;
	if(value != "" && !code.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验传真
jQuery.fn.validateFax = function(id,msg){
	var value = $("#"+id).val();
	var code = /^(\d{3,4}-)?\d{7,8}$/;
	if(value != "" && !code.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验日期小于今天
jQuery.fn.validateDate = function(id,msg){
	var value = $("#"+id).val();
	if(value == ""){
		return ;
	}
	var r = FormatDate("");
	if(value != "" && value > r){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验URL
jQuery.fn.validateURL = function(id,msg){
	var value = $("#"+id).val();
	var strRegex = "^(http|https)\\://([a-zA-Z0-9\\.\\-]+(\\:[a-zA-"   
        + "Z0-9\\.&%\\$\\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{"   
        + "2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}"   
        + "[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|"   
        + "[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-"   
        + "4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0"   
        + "-9\\-]+\\.)*[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,4})(\\:[0-9]+)?(/"   
        + "[^/][a-zA-Z0-9\\.\\,\\?\\'\\\\/\\+&%\\$\\=~_\\-@]*)*$";
	var re = new RegExp(strRegex);
	if(value != "" && !re.test(value)){
		if(errorElement){
			showMsg(msg, 'danger',id);
		} else {
			layer.msg(msg,{time: 2000});
		}
		return true;
	} else {
		return false;
	}
};
//校验select未选中（前提是未选中的value值必须为00）
jQuery.fn.validateNoSelect = function(id,msg){
	if($("#" + id).val() == '00'){
//		if(errorElement){
//			showMsg(msg, 'danger',id);
//		} else {
			layer.msg(msg,{time: 2000});
//		}
		return true;
	} else {
		return false;
	}
};
//校验checkbox未选中
jQuery.fn.validateChecked = function(id,msg){
	var checked = $("#" + id).attr("checked");
	if(checked != "checked"){
//		if(errorElement){
//			showMsg(msg, 'danger',id);
//		} else {
			layer.msg(msg,{time: 2000});
//		}
		return true;
	} else {
		return false;
	}
};
//校验select_check未选中
jQuery.fn.validateSelectChecked = function(id,msg){
	var checked = $("#" + id).hasClass("checked");
	if(!checked){
//		if(errorElement){
//			showMsg(msg, 'danger',id);
//		} else {
			layer.msg(msg,{time: 2000});
//		}
		return true;
	} else {
		return false;
	}
};
/*自定义方法，校验文件*/
jQuery.fn.validateFileUpload = function(id,msg){
	var boxShow = $("#"+id).parents(".uploadFileBox").find(".upload_file_box");
	var size = boxShow.length;
	var result = true;
	for(var i = 0;i < size;i++){
		if(!$(boxShow[i]).is(":hidden")){
			result = false;
			break ;
		}
	}
	
	if(result){
//		if(errorElement){
//			showMsg(msg, 'danger',id);
//		} else {
			layer.msg(msg,{time: 2000});
//		}
	}
	return result;
};
function showMsg(msg, type ,id) {
	$("#" + id).parent().css("height","35px");
	$("#" + id).parent().find(".alert_login_error").remove();
	var html = '<div class="alert_login_error" style="position:relative;z-index:2;left:102%;top:-30px;padding-right:15px;display:inline-block;"><div class="error_sanjiao"></div><span>'+msg+'</span></div>';
	$("#" + id).after(html);
}
$("input").focusout(function(){
	$(this).parent().find(".alert_login_error").remove();
});

function FormatDate (strTime) {
	var date;
	if(strTime != ""){
		date = new Date(strTime);
	} else {
		date = new Date();
	}
    var year = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    if(m < 10){
    	m = "0" + m;
    }
    if(d < 10){
    	d = "0" + d;
    }
    return year +"-"+ m +"-"+d;
}


/** 消息提醒 * */
var v = v
	|| {
		_mask_index : 0,
		showMask : function () {
			this._mask_index = layer.load(1, {
				shade : [ 0.4, '#000000' ]
			});
		},
		hideMask : function() {
			layer.close(this._mask_index);
		},
		/*
		 * 身份证15位编码规则：dddddd yymmdd xx p
		 * dddddd：6位地区编码
		 * yymmdd: 出生年(两位年)月日，如：910215
		 * xx: 顺序编码，系统产生，无法确定
		 * p: 性别，奇数为男，偶数为女
		 * 
		 * 身份证18位编码规则：dddddd yyyymmdd xxx y
		 * dddddd：6位地区编码
		 * yyyymmdd: 出生年(四位年)月日，如：19910215
		 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
		 * y: 校验码，该位数值可通过前17位计算获得
		 * 
		 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
		 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
		 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
		 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
		 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
		 */
		validateIDCard : function (idCard){
			//15位和18位身份证号码的正则表达式
			var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
			//如果通过该验证，说明身份证格式正确，但准确性还需计算
			if(regIdCard.test(idCard)){
				if(idCard.length==18){
					var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
					var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
					var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
					for(var i=0;i<17;i++){
						idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
					}
					var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
					var idCardLast=idCard.substring(17);//得到最后一位身份证号码
					//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
					if(idCardMod==2){
						if(idCardLast=="X"||idCardLast=="x"){
							return true;
						}else{
							return false;
						}
					}else{
						//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
						if(idCardLast==idCardY[idCardMod]){
							return true;
						}else{
							return false;
						}
					}
				} 
			}else{
				return false;
			}
		}
}
