// 姓名
var rolename = getUrlParams('name');
show = true
if (typeof (rolename) == "undefined" || rolename == null) {
    rolename = "未知";
    show = false;
}
document.getElementById('name').innerText = rolename;
// 立绘
var picurl_root = "https://patchwiki.biligame.com/images/sr";
switch (rolename) {
    case '卡芙卡':
        picurl = "/4/4d/nknfqbj6ig88564ivr3q079qh960c1b.png";
        break;
    case '刃':
        picurl = "/3/36/10dqd1wzjx1xoppxz46ygeqmbxf6rpt.png";
        break;
    case '罗刹':
        picurl = "/e/e4/snkt80kmu6qjcfbo4mchcdcolnerx0t.png";
        break;
    case '银狼':
        picurl = "/e/ea/mavqad0rxp6zttalka56tspnd1t9qi8.png";
        break;
    case '景元':
        picurl = "/2/21/7cdhu682y5kup1lcp06ve2cncp4kz2g.png";
        break;
    case '开拓者':
        picurl = "/c/ca/4pvz8amab0bem4vazg00blxhr7xnaau.png";
        break;
    case '白露':
        picurl = "/d/dc/20tvbl6dxcecm6rn2imnzlemhh3ffr0.png";
        break;
    case '彦卿':
        picurl = "/5/50/feltlebdj6273djraeix51z9wrpxf2x.png";
        break;
    case '白露':
        picurl = "/d/dc/20tvbl6dxcecm6rn2imnzlemhh3ffr0.png";
        break;
    case '姬子':
        picurl = "/0/05/af9uyqk356aa8q4n27lw7wn12j1t7we.png";
        break;
    case '杰帕德':
        picurl = "/b/b5/58je6egugnhlr7mwsjjkc3a58o08fgl.png";
        break;
    case '克拉拉':
        picurl = "/9/9e/fb0howtu57fgb0ccm4qegqbtc4zvt6p.png";
        break;
    case '瓦尔特':
        picurl = "/c/cf/pbqb1ox5vizg3klavrd41fdtawx2tk3.jpg";
        break;
    case '希儿':
        picurl = "/9/92/jxsxrkyhkjyoyp39gvjw8b6i98u4gam.jpg";
        break;
    case '布洛妮娅':
        picurl = "/f/f8/k08zmgcxrh26gso7z8w4afpcj8n3sov.png";
        break;
    case '卢卡':
        picurl = "/f/fc/b7aquclnjlgarcnjzu0pbiegxoplirv.png";
        break;
    case '驭空':
        picurl = "/7/72/k3jp2bsclezw6h7gqq61uw6qvsecjox.png";
        break;
    case '停云':
        picurl = "/9/92/5em7gpwscup6ag18wf46qduk5uilv5t.png";
        break;
    case '青雀':
        picurl = "/9/9d/f1l3bb3agxofvt78pagrikgyiitcq7a.png";
        break;
    case '黑塔':
        picurl = "/f/f7/7prg1ft3buafziroyspnnutke4yvotw.png";
        break;
    case '阿兰':
        picurl = "/3/34/0jz91oea8wwcx537p4cyy5c73nu0cj0.png";
        break;
    case '李素裳':
        picurl = "/6/62/03l6560bveh17pigs9jxsrg9jjk1qlk.png";
        break;
    case '娜塔莎':
        picurl = "/c/c7/ou11kkss3vmr44v7iosik4uyrrof3vr.png";
        break;
    case '希露瓦':
        picurl = "/c/cf/l5kq8zxopx7wfs9jjjm0zm2bvnufju6.png";
        break;
    case '桑博':
        picurl = "/e/e8/23cwpt0m7yk0tkxh8h59mwipcwq1grk.png";
        break;
    case '佩拉':
        picurl = "/e/ec/s2ttvcyq91wjmherjpwisxl3gutkqat.png";
        break;
    case '虎克':
        picurl = "/7/78/4c8wt8eejiudj1s5a97kih5epfrj8pc.png";
        break;
    case '三月七':
        picurl = "/e/e8/1q46duvfdnp2bpd67qfaa1dsbycrijj.png";
        break;
    case '艾丝妲':
        picurl = "/f/fb/t3l8ksl1j60xbi9zpfdhj8w2wb5hibh.png";
        break;
    case '丹恒':
        picurl = "/3/34/hf2o5suregc5fswecw8o5x7oki5229a.png";
        break;
    case '符玄':
        picurl = "/2/2e/4xjrcxr90bt7o2u2964twkd4vli0q4m.png";
        break;
    case '玲可':
        picurl = "/1/10/1h9lkavk03ztppspdyhjkltrs2py6a2.png";
        break;
    case '饮月君':
        picurl = "/0/04/43nk7fcvbcmeflbxziccsra8havwu5u.png";
        break;
    case '镜流':
        picurl = "/b/b9/b1v5kx6pyxkq288telfdwdik5qiyw64.png";
        break;
    case '托帕':
        picurl_root = "https://upload-bbs.miyoushe.com/upload";
        picurl = "/2023/08/15/288909600/fdadb4375abf4389ba0ca178ba7a38f9_8360062052700257391.jpg";
        break;
    case '桂乃芬':
        picurl_root = "https://upload-bbs.miyoushe.com/upload";
        picurl = "/2023/08/16/288909600/4c0a5c928a01e66ae75c2636d361e660_7040364540509287311.jpg";
        break;
    default:
        picurl = "/f/f1/7291wtkufijrg6yw4wte3nnlbxhax34.png";
        break;
}
document.getElementById('img1').src = picurl_root + picurl;
// 属性
var list = getUrlParams('list');
switch (list) {
    // 物理
    case '1':
        list_a = "物理";
        break;
    // 火
    case '2':
        list_a = "火";
        break;
    // 冰
    case '3':
        list_a = "冰";
        break;
    // 雷
    case '4':
        list_a = "雷";
        break;
    // 风
    case '5':
        list_a = "风";
        break;
    // 量子
    case '6':
        list_a = "量子";
        break;
    // 虚数
    case '7':
        list_a = "虚数";
        break;
    // 错误参数
    default:
        list_a = "未知";
        break;
}
document.getElementById('list').innerText = list_a;
// 命途
var line = getUrlParams('line');
switch (line) {
    // 毁灭
    case '1':
        line_a = "毁灭";
        break;
    // 巡猎
    case '2':
        line_a = "巡猎";
        break;
    // 智识
    case '3':
        line_a = "智识";
        break;
    // 同谐
    case '4':
        line_a = "同谐";
        break;
    // 虚无
    case '5':
        line_a = "虚无";
        break;
    // 存护
    case '6':
        line_a = "存护";
        break;
    // 丰饶
    case '7':
        line_a = "丰饶";
        break;
    // 错误参数
    default:
        line_a = "未知";
        break;
}
document.getElementById('line').innerText = line_a;
// 其他
var other = getUrlParams('other');
main = false
if (typeof (other) == "undefined" || other == null) {
    if (show) {
        document.getElementById('model-no').style.display = "none";
        document.getElementById('model-normale').style.display = "";
    }
} else if (other == "0") {
    // 开拓者
    document.getElementById('model-no').style.display = "none";
    document.getElementById('model-main').style.display = "";
    document.getElementById('img2').style.display = "";
    if (line == "1") {
        // 毁灭命途
        document.getElementById('img1').src = picurl_root + "/5/58/2dishd6nydg68hp6ay0wjtpgjgjbmfz.png";
        document.getElementById('img2').src = picurl_root + "/5/51/a8tjm9d781ac6tw2vyhg5q8ss058415.png";
    } else if (line == "6") {
        // 存护命途
        document.getElementById('img2').src = picurl_root + "/2/24/g3gk5z35af2xbrhdm6jwrvdlx71lo0p.png";
    } else {
        document.getElementById('img2').src = picurl_root + "/5/51/a8tjm9d781ac6tw2vyhg5q8ss058415.png";
    }
    main = true
}

// 跳转至3D模型
function model(val) {
    switch (val) {
        case 1:
            window.location.href = "3d.html?name=" + rolename;
            break;
        case 2:
            window.location.href = "3d.html?name=男主";
            break;
        case 3:
            window.location.href = "3d.html?name=女主";
            break;
        default:
            alert('错误!无法获取角色名!');
            break;
    }
}

function download() {
    if (main) {
        var img1 = document.getElementById('img1').src;
        var img2 = document.getElementById('img2').src;
        window.open(img1, "_blank");
        window.open(img2, "_blank");
    } else {
        var img = document.getElementById('img1').src;
        window.open(img, "_blank");
    }
}