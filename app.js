(function () {
  'use strict';

  var tasks = [
    ['一名嫌疑人在撒哈拉广场丢下了一个公文包。你的第一反应？', ['立即控制现场并呼叫支援', '利用你的人脉网络处理此事', '跟踪他以获取情报，保持隐蔽', '采取缓慢谨慎的行动'], 0],
    ['你在冻原区晚宴上身份暴露。如何脱身？', ['缓缓朝门口移动', '编造故事迷惑众人，悄悄离开', '以主人身份维持局面', '直言不讳地突破防线'], 1],
    ['总部给你分配了一个新搭档。你的反应？', ['需要证明他们的忠诚度', '合作能提高任务效率', '需要很久才能习惯', '有人分担责任很有用'], 1],
    ['机密情报在黑市上被出售。你的应对方式？', ['交由专家团队处理', '信息处理速度缓慢', '按规程设置陷阱逮捕卖家', '先买下来再转手获利'], 2],
    ['监视任务期间有平民陷入危险。你怎么做？', ['让手下去处理此事', '救他们但伪装成巧合', '等反应过来事情已解决', '立即干预，拯救生命优先'], 3],
    ['你截获了一条加密信息。如何破译？', ['破译需要大量时间', '交由专家团队处理', '使用官方数据库逐一比对', '你曾参与密码编制'], 3],
    ['局长向你提出晋升。你的回答？', ['邮件还在处理中', '你是提拔他人的那一方', '先查清楚有什么条件', '欣然接受并努力证明自己'], 2],
    ['你的藏身处暴露了。你去哪里？', ['冻原区任何地方都是你的地盘', '迁移到之前的安全点', '撤回总部并提交报告', '找欠你人情的线人帮忙'], 1],
    ['你发现ZPD内部有内鬼。你的策略？', ['他是你的人，一切都在计划中', '调查需要时间进行', '散布虚假信息钓出他', '立即向上级汇报'], 2],
    ['任务完成。你如何庆祝？', ['举办专属的私人聚会', '庆祝活动还在进行中', '独自享受安静的胜利时刻', '与团队分享庆祝并继续工作'], 3],
    ['同事问你周末在哪。你的回答？', ['商业机密，别问那么多', '加班处理紧急报告', '放松？我在处理一些“特殊业务”', '已经是下周一了，时间过得真快'], 1],
    ['你发现了一个致命漏洞，但官方还没发现。你的选择？', ['立即上报，让官方去头疼', '先自己利用一下，然后再说', '这事儿让我慢慢想想', '用来作为谈判筹码最好'], 0],
    ['一个看起来很可疑的快递包裹到了办公室。你怎么做？', ['拆开看看——怕什么呢', '立即疏散人群并叫爆炸物处理队', '等等，让我再想想该怎么办', '看起来寄件人很熟悉，这是我的私人物品'], 1],
    ['局里的咖啡机坏了。这是你的问题吗？', ['谁在乎咖啡？我有其他地下渠道', '这得要时间才能修好', '这不在我的管辖范围内，报告给设施部', '嘘，我知道谁修得最快'], 3],
    ['你最近工作压力很大。朋友问你怎么样？', ['最好别知道太多细节', '一切顺利，继续全力工作', '这个需要时间来调整心态', '压力？哈，这就是我的舒适区'], 1],
    ['局里举办年度表彰大会。你会去吗？', ['当然不会，我在处理更重要的事', '肯定要去，这是职业义务', '等到仪式差不多结束再去', '我是通常会以特殊方式出席的那个'], 1],
    ['一个老线人发来了暗语信号。你的直觉？', ['马上驱车前往约定地点', '这听起来像是个陷阱，先调查一下', '等等，我得想想这是什么意思', '有意思，看来又有人需要我的帮助'], 1],
    ['你被指派去参加一个无聊的内部培训。反应？', ['一边听一边计划真正重要的事', '认真听，这是规定', '大概中途才能真正醒过来', '这种场合我通常会派手下去'], 1],
    ['你发现了一个有趣的巧合。怎么处理？', ['记录下来，以后可能用得上', '立即追查是否有关联', '这需要更多时间来分析', '有趣，但可能不值得浪费精力'], 1]
  ];
  var quotes = ['「任何哺乳动物，无论大小，都能成就伟大的事。」', '「我不会让任何人告诉我，我做不到。」', '「相信自己，即使没有人相信你。」', '「每个警察都是从第一天开始的。」', '「在这个城市里，最好的武器就是你的头脑。」', '「没有完美的计划，只有完美的执行。」', '「真正的勇气，是承认自己害怕，然后继续前进。」'];
  var index = 0;
  var score = 0;
  var locked = false;
  function byId(id) { return document.getElementById(id); }

  function render() {
    var task = tasks[index];
    byId('counter').textContent = (index + 1) + '/' + tasks.length;
    byId('caseNo').textContent = String(index + 1).padStart(3, '0');
    byId('bar').style.width = ((index + 1) / tasks.length * 100) + '%';
    byId('prompt').textContent = task[0];
    byId('status').textContent = '';
    byId('next').classList.remove('show');
    byId('quote').innerHTML = quotes[index % quotes.length] + '<small>—— ' + (index % 2 ? '大先生' : '朱迪') + '</small>';
    locked = false;
    byId('choices').innerHTML = '';
    task[1].forEach(function (label, optionIndex) {
      var button = document.createElement('button');
      button.className = 'choice';
      button.dataset.index = String(optionIndex);
      button.innerHTML = '<b>▸</b>';
      button.appendChild(document.createTextNode(label));
      button.addEventListener('click', choose);
      byId('choices').appendChild(button);
    });
  }

  function showComplete() {
    byId('file').hidden = true;
    byId('complete').classList.add('show');
    window.scrollTo(0, 0);
  }

  function choose(event) {
    if (locked) return;
    locked = true;
    var picked = Number(event.currentTarget.dataset.index);
    var correct = tasks[index][2];
    document.querySelectorAll('.choice').forEach(function (button, optionIndex) {
      button.disabled = true;
      if (optionIndex === correct) button.classList.add('good');
      if (optionIndex === picked && picked !== correct) button.classList.add('bad');
    });
    if (picked === correct) score += 1;
    byId('status').textContent = picked === correct ? '[✓] 决策符合协议。关系网络稳定性 +4' : '[!] 记录偏差。系统完整性下降，正在重新校准...';
    if (index === tasks.length - 1) window.setTimeout(showComplete, 650);
    else byId('next').classList.add('show');
  }

  byId('enter').addEventListener('click', function () {
    byId('gate').hidden = true;
    byId('app').classList.add('active');
    render();
  });
  byId('next').addEventListener('click', function () { index += 1; render(); });
  byId('restart').addEventListener('click', function () {
    index = 0;
    score = 0;
    byId('complete').classList.remove('show');
    byId('file').hidden = false;
    render();
    window.scrollTo(0, 0);
  });
  byId('audio').addEventListener('click', function () {
    var isOn = byId('audio').getAttribute('aria-pressed') === 'true';
    byId('audio').setAttribute('aria-pressed', String(!isOn));
    byId('audio').textContent = isOn ? '◖ BGM OFF' : '◖ BGM ON';
  });
}());
