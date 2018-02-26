# validateForm
异步校验插件

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
 
 ![pic1](https://github.com/lovlin1990/validateForm/blob/master/first.png);
