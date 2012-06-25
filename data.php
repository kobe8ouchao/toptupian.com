<?php
include_once('init.php');
$data = array();

$data[] = (object)array('image'=>'../collection/sample/1.jpg',  'title'=>'可爱与性感集于一身 来自韩国的荷叶边复古连衣裙');
$data[] = (object)array('image'=>'../collection/sample/2.jpg',  'title'=>'关爱自己body的同时，千万不要忘记一些小细节，要想让别人爱你，首先先要爱自己。@日本LC品爱 一直是为女生专用护理设计出的牌子，迦沐弹力泡沫是我之前推荐过的迦沐草本皂的升级版，美白效果更明显，泡沫更丰富，能更全面的呵护身体。当然所谓的body也有指“私处”哦。');
$data[] = (object)array('image'=>'../collection/sample/3.jpg',  'title'=>'只为那一抹清新的绿');
$data[] = (object)array('image'=>'../collection/sample/4.jpg',  'title'=>'穿好人人都变小细腿儿');
$data[] = (object)array('image'=>'../collection/sample/5.jpg',  'title'=>'性感蕾丝');
$data[] = (object)array('image'=>'../collection/sample/6.jpg',  'title'=>'贴身舒适，超级有型。');
$data[] = (object)array('image'=>'../collection/sample/7.jpg',  'title'=>'我和益若翼~~买过她家假睫毛的请举手');
$data[] = (object)array('image'=>'../collection/sample/8.jpg',  'title'=>'头发留那么长实属不易，“养”了那么长时间也有感情，但又会对杂志上的QUEEN B QUEEN S的发型馋涎欲滴，我还没有潇洒到减去一头长发，但也会尝试改变下自己，在买的2款假发，一个是发片让头发秘密增多的好武器，一个是梨花头带好立刻变身乖乖女。@花部屋旗舰店');
$data[] = (object)array('image'=>'../collection/sample/9.jpg',  'title'=>'大头不适合带帽子,我去ZARA/HM买帽子都要带男士的L号的算囊意思, 鞋子是@STACCATO 的 今年就收了她家2双鞋子一双是E嫂设计的靴子一双是毛毛高跟，春天快到了，我要HOT PINK!!!!');
$data[] = (object)array('image'=>'../collection/sample/10.jpg', 'title'=>'这是在I-DOU收的小西装一件，非常淑女气质，而且很适合OL MM哦，他们网站最近出了很多新款，都是欧美风的，喜欢的看看，不怕撞衫哦。');
$data[] = (object)array('image'=>'../collection/sample/11.jpg', 'title'=>'自从看了gossip girl后就对这支帅哥美女都用的润唇膏感兴趣，所以一下子收了全部的味道，这是今年最爱的润唇膏，没有之一！打开后就像剥了壳的鸡蛋般润滑，涂在嘴唇上也立刻润色了嘴唇，含维他命而且涂了后一天也不会干，还有防晒指数15哦');
$data[] = (object)array('image'=>'../collection/sample/12.jpg', 'title'=>'百搭的打底衫，其实是长款哦，但是我配高腰裤穿啦，另外超级便宜诶~~~店主MM搭配的也很好看，大家看下吧');
$data[] = (object)array('image'=>'../collection/sample/13.jpg', 'title'=>'偶尔瞥了一眼VIVI杂志结果就爱上了这个款式，口袋的毛毛是貉子毛领，摸上去超级柔软啊，冬天很想把脸捂在里面衣服的款式怎么说呢？erm...偏海军风一点啦 所以从阿眯头这里过去的有团购价哦，只要报暗号“阿眯头”就可以享受，有毛领的399，没有毛领的280');
$data[] = (object)array('image'=>'../collection/sample/14.jpg', 'title'=>'金盏花药膏，这个要特别推荐的原因是，我只要发了痘痘涂好之后第二天痘痘就会变得超级小，第三天就消失了因为我本身不是长痘痘的皮肤，我长痘痘通常都是，通宵了啊，熬夜啦，吃辣吃太多啦，或者月经要来之前才会这样所以长出的痘痘都是有毒性的……摸上去非常疼的那种。');
$data[] = (object)array('image'=>'../collection/sample/15.jpg', 'title'=>'当时在淘宝上买的时候和另一款去黑眼圈的产品纠结了很久，因为另外一款只要48元，作用也是去黑眼圈+补水，后来仔细看了下成分，一个多了绿茶芦荟，绿茶是很好的抗氧化产品，对排毒啊，消黑眼圈的效果很大的老人不是常说天天喝杯绿茶有助于延缓衰老么，对保护心血管也是有很大的作用。');
$data[] = (object)array('image'=>'../collection/sample/16.jpg', 'title'=>'自然增高的坡跟靴，让小腿的线条好美丽。');
$data[] = (object)array('image'=>'../collection/sample/17.jpg', 'title'=>'堂主家的衣服，很喜欢这种帅气的双排扣大衣，版型什么的都很挺括，穿着也显瘦不会冷，冬天就应该有一件这样帅气不失温调的大衣啊 >_<');
$data[] = (object)array('image'=>'../collection/sample/18.jpg', 'title'=>'还是没有忘记敷面膜，这次推荐的大家肯定喜欢，备受好评的 台湾很多明星推荐来的，我很谨慎的只买了一小包，2礼拜不到就用完了。听我的，好用到一包不够的哦。店家正在搞双12活动，大家可以去看看。');
$data[] = (object)array('image'=>'../collection/sample/19.jpg', 'title'=>'翻出前阵子大广角镜头翻出的照片 腿肿么能拉的那么长 朋友推荐我去参加评选 就拿这张去报名吧，每周送出HTC CHACHA 手机一台');
$data[] = (object)array('image'=>'../collection/sample/20.jpg', 'title'=>'看上去不起眼儿的T型罐子，一开始body silk深深的吸引了我，非常2B的把SLIK看成了MILK，心想牛奶涂身体上肯定滋润，但是silk比milk还要强大其实，身体如丝绸般滋润有木有。');


// 随机抽取9条记录以模拟实际情况
$keys = array_rand($data, 12);

$json = array();
foreach($keys as $key)
{
	$json[] = $data[$key];
}

exit(json_encode( $json ));
