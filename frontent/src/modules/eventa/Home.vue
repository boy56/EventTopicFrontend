<template>
  <div class="event-page-wrapper" v-title data-title="事件分析">
    <div class='search' style="width:100%">
      <v-filter-tab @update:filter="updateFilter"></v-filter-tab>
      <v-search-box :search-input.sync="searchInput"></v-search-box>
      <!-- 注释，单行或多行 -->
    </div>
    <table class="event-table" border="" cellspacing="" cellpadding="" style="width:100%; height: 800px">
            <tr>
                <td style="width:50%; height: 50%">
                  <div id="left_up" ref="myCharts" style="width:100%; height: 100%"></div>
                </td>
                <td style="width:50%; height: 50%">
                  <div id="right_up" ref="myCharts" style="width:100%; height: 100%"></div>
                </td>
            </tr>
            <tr>
                <td style="width:50%; height: 50%">
                  <!-- <div id="left_down" ref="myCharts" style="width:100%; height: 100%"></div> -->
                  <table border="" style="width:100%; height: 100%">
                    <tr style="width:100%; height: 20%">
                      <th colspan="2" style="width:100%; height: 20%; vertical-align: middle !important;text-align: center">
                        专家观点
                      </th>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">观点数量</td>
                      <td style="width:80%; height: 20%">中心观点</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">22</td>
                      <td style="width:80%; height: 20%">外交部：反对以航行自由名损害中国主权和安全</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">12</td>
                      <td style="width:80%; height: 20%">外交部：美方“横行自由才是南海局势紧张根源</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">17</td>
                      <td style="width:80%; height: 20%">美军接连两天在南海动 解放军警告驱离</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">26</td>
                      <td style="width:80%; height: 20%">挑衅？美国派军舰连续两天闯中国南岛礁 ，被我军海空兵力警告驱离</td>
                    </tr>
                  </table>
                </td>
                <td style="width:50%; height: 50%">
                    <!-- <div class="row main-row" v-title data-title="Ring 事件概览">
                        <div class="col-md-8">
                          <div class="r-panel hotnews-panel">
                            <div class="panel-title-wrapper">
                              <div class="panel-title">
                                <span>事件概览</span>
                                <div class="switch">
                                  <span class="fa"
                                    :class="{
                                      'fa-toggle-on': translated,
                                      'fa-toggle-off': !translated
                                    }"
                                    @click="translated = !translated"></span>
                                  <label class="toggle-label">翻译</label>
                                </div>
                              </div>
                            </div>
                            <div class="events-wrapper">
                              <ul class="event-panel-detail">
                                <li >
                                  <label for="">描&nbsp;&nbsp;&nbsp;述：</label><span class="title">美舰连续两天在南海非法活动</span>
                                </li>
                                <li>
                                  <label for="">参与者：</label><span>美国&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  <label for="">关键词：</label><span>美国 南海 非法活动</span>
                                </li>
                                <li>
                                  <label for="">类&nbsp;&nbsp;&nbsp;型：</label><span>外国入侵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  <label for="">标&nbsp;&nbsp;&nbsp;签：</label><span>外交问题</span><br class="event-br">
                                  <label for="">情&nbsp;&nbsp;&nbsp;绪：</label><span>中性</span>
                                </li>
                                <li>
                                  <label for="">时&nbsp;&nbsp;&nbsp;间：</label><span>2020-04-20 18:20</span><br class="event-br">
                                  <label for="">地&nbsp;&nbsp;&nbsp;点：</label><span>中国南海</span><br class="event-br">
                                  <label for="">来&nbsp;&nbsp;&nbsp;源：</label><span>新华网</span>
                                </li>
                              </ul>
                              <v-desc-view :event="event"></v-desc-view>
                              <div class="event-panel event-panel-source">
                                <div id="source-timeline" class="event-chart"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div> -->
                    <!-- <div class = 'picture'> -->
                        <img src='data:image/png;base64,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
                        3Xr6XlzTfa3TXadcmjqLnLA7rS4c27fnt37Dl2/g16HTqK1Q+/zenFxl8lvZx98bqfiC65eaC90wm/LwLp7l44c/O33P45dvvPtdo2v0X3UDeeydWoJl9pdFvPo5C6TPUduvo0m6ltjQ3rTyjhckcpwtZFeLeuJe41Wm6lDLAllM4VErtbxR/IfnDlg8vveBy6pFKFmsgSlN/yuBfVMc4bdU6fKESZ2xMWO0FKxWKJae+Z9A9XiUH20l4fHpp2PT2rNtPF2GZ2SVx9lc3zf7zdfR+M7qYGoK9ru9L4/niYNY4ugIfnePH7w+OnDh0zMo1sXOovtzQ4ceRNHYSzg6W2MwYh5vvfUM5duilSrlMjUOuFkxcurx0x+2337Y8QUV81oRumNuGuBNlj4yexTYS9Frf6Z9KZTC0jtAZYXft998LlHFlmsW+pLO3/gt9/PmcfWjyuJPKKk9td+vPHbicf2xS0DzQXhD87su+GWxZKoxeQO5ydYA9i111n4Q3gVjKaPxNPnDJ47lQ3RpazWF7tNTPaeeJfczufMdjUM0ZlDEWbndu3Ze/jQwT9MTHyzKwI/Wl46uXfvGbNPLi4ubi4fnpzdi/bb104pVX3DxS6PHz95/sbmi0tkdXUcSm9mZrdPXL4enNcUiN1zmjjZkmL97GNWx9xQ4ad7Zo/QwE+fWmVXVgShXf2Lrc2HT2/Mbxww2XflgZW9A9r/PTMbRle3k30vveH0WtZgvsW1A4fP2A+ufFrgrgUAwD/T35Xe0v1/wZnT/qGRvllUm4ExvaEvYg27v62HYTheynnzHV1DDP6Wd6Cq+fPxX+7s2fegakG6vDTuafMtvZ21dMspzI9yf3fWkN5kfEpndWFizHfTW0p+y4DhQbJ6rZgxkeX1+tguk6PX3lWMcnVyfmPyl7OHTQ5efZVY2Ydfsy5kzw4UFb61IJ7Wi6e3uwndfbWZwcHBYeHxTe1dEQ5PD5xxGJMpt5neJOyJXB9fX9R5e358ce+4oW0Pt//szbdf3LC3UFfUr1pJb/tvB1M3bka9jtaXY3HE5DeLCLpEYXg+xVzczYtnTc3rp8RcGmNJJOdM1rk/urzH5LcL5j5tJB7eqqjTaFX40yuwbjH/jeHMacnMSolSqdCs/jkArVq2ONZTmhXrafv40O5de46ce+mVPs7a9FLFDelNMhHvFRgWm5iUlJQQ6fv0/P4/Dl/0zu4imvM0ktnWVKuzh45dfpPfy1Dpl7+lN61yqNDrrMn1sPpZLPtJaeWZ0T4+GXM/OAqrOTO9RWhim0pOrewhMqdeq6S0Z1pePYqCq0cV+dva1XFr3d8e27X7Wf6coZeXbWf+NTTC6o7Js+iO2frIm/tOuGZ3i3hUPL2NMyXNMea/HXuS1r6ArV6NbKE798O1Y4fOPEttXVTql1ent7m64Isml30Kh+TbTm96nZo2XO396iYKUCfufqybwe630Cg4+W73D/1usvuieVJ1H9twX66MVGd97sTpq09dgqOdra6cvGJT2MdQazX0voLXt0+gvevG51QSH1t6nVpMpywuLiyQZubG+nvaOwbnZkZLw22wv0hOvsjpp1G7k67vvxlY0lHqYWHjFx7h+PYM9rReoWSxw+v5hX0nH2YPsNAGJBVbnzp/MbVfguZSJZMssWgLMxN9rTVVRWHYmVOvmKjyIQFnJsyQ3rgihWhpCW1iFY+xSKHNT08OdjaWNpQnYXu7z9e3D/agqe85fNPcxt3Lx9cnorRtZvWzJX+Y3tQSZlGA1fE/TG58KRUSZZDeAAD/UP/c9JYZHts5y/v29bsqva22NFXh7h3TPbvFjy/pdYvdmU9O/XHI3LWipLw4LeTp9cO7bwVPGNLbb3/sO3jo0P59e1BecCoapw4WOFq/fLmqs7xz2sRk96mLdyxXFb7yKRaoxKP1KV+sTA//sevAuXsRlSMS7Mm0ejlvJtvjwf7dvx84ceWFc2jlAFWr06jp/cbfWsDT202fOh4RAfQScufXZ6dNnkbytCo8ve298y4gKCAgyO3Z2RO/7T1s+tYV9fp4f0SHajy9oaO1WipaHG1PD3F4bHr5/PU7lndP7j90yOzxw4vnL5hZvA3MqBqZYUsV2Mkr6Vyj3cOjv++5YOsbnVtSUVH5rSvOjPlkcR0dcW/5lnKZ042VpdlJQU+PH9576NgDS+sXFuaf3H0+PLh88I/fT5068fueA9csv2a3zTIGC96t8fLuqaO/79pz5t4LooCQMEol9dSXxAa6frB5+fDmpcOGR5scvv4yoaKbxpdvcQZqQ3qTz6d9uIuKcLuP3fRMqSPzsBOXWrmgMzfw6eVj+w9cDquYEBvynCG9nf4YUjQ0OpLocm/30ec5A3Q0LRm5xe7xqUPP4tg/ansjd5R6vX772c0DRYA1nafT+/e2IaUT+IVnzKHi97fP7v3N5NSLEIpEJ2fPdjRia7U0N8b23pk9u3Z/rTV8AJaXuZO9EwNl71F6i+kU0Sery2uHZxkizlyQpSG9saT0sZqEhKoJukijkg2WRjy/fnLPrpN+hcP4RXuG9Hbc2jOzf3wmx/fRnkOPElrm1StnTo9ceUis7w0CkgtpYvlIafjTW+f2/m5icuxxdjeZeNC0XiuYa/V+cRXt+vtPXn3jHNk5y1WKWU05oc+uHTdcpvnbwXNmXjnto43pz03P7t198NiR3bv3n3zuGjswM14SH/nl47t3b9++eW39wvzJg2dWNi8fnzm0Z+/xk4f/OPw0oLQj88vew2ZRtbPcxUm6iG/8rQWUTSmtKe8cQjsXBJpl5UCS1YmzhvQmJ2d7OL+weHz/zq0rZ49/DQowNTn22jOte2R6cqAjMeDLK9/04dGpmekFDmMi1+vrS0tzs3u3r108bRrTLuEstBdG2Zpf/QPN9R/7z94w+xycO0YTa7XclmAfYl28e2fz5vXtC1i8PHPbnCgieBY0zimWNQN5nleO7TY5eC9jkGlYRxhIbwCAf6Zflt40CgmXSS1OjWqdQkEKO3PqExSOBAf4BgSHYa8CPLZ35lSnlM5WpJf1DPRmx4RXDpOxh18gHCaVzloienh8oUhheBanTqOUSGQqw6M1N6HXLrQnPTxxw7ekOfXduX179+zes/+CbxXbkN4uvPaprqtLD7BDhxan4gmtSi4SYJiLA8neLi5uzq9Nj/128NLXtC6moZwglrOnaj/dOrr7jz1nr1nn9VCVxoth9Dq1lFYUYH3i8P49B068T+nE2kVW/VKWktTw6t7ZXXsPHjtxEnf86OEDBw+9iu/Q6DTkzszXpidPnjp9xuC0YQC87/TpY3tW0htnrMzmMnrn9LmLl196pg1SqA1Bj4+eu5rSQZ3tKHR4dvPMmVMnjh8/8yCEpFDrVdz6WIdrp48ePHjw0JE1Dh86dOjwkRPXrLN6yIzhrCeo5+jRI0ePYZM8e/78+TPHDuzZd+DcK++smYXxqLcXD+4/dNM5a6w25CSa+R93jm1zQ0EWx/bs2vXH7r1Hjp+6dPeZb0bdIluk/t5DF3QyIZfLFciUKxcP6rUKiZBNp1AWKBQynbskXPkFVU1T1JOTh/cfOnbLv3RYsTI4azjnxanDhw4fPXHiBFrES+9DRhky/bKW2plmfn7P27Sh70zbQDFaGHrT5MQ7//i8nLw1XbTL6RNHn4a1Y1ezaehJb6/u/WP3sbufaibZqE75fL3Nowv79+9H+9iuXbsOnXxYSyX2Sb1Ox58sN6S3LpTXdTphd6ztxVNH9+3edcgmbJor12FXQaKF0vRn2Jw+sv/g0etfMzrkK0skIlW9OYOW6MjxEyePHj58/qVnJ1mM1spoWfD99et8TffcJXxWoO5Lstm/Z8/xGzYZnaTVF23pdRoppTPw7f2jB/ffeOM7MDcW9/ru8ePH0da/ZuWdGO364Oqd568srp07tPvgWWv/vLHBmvdXThy99a5soCPy/s0jR44eP3HqDLajXLx85fKpY4dOX7erGxwI/2i6f//BQ/v3nHj0qXFeZNhS334pC5uuVsUnN9heuXLj9vUTB3cfOmeaOypd1tFzXr94/NbWIzSppLKuuy757u49Bw4dwZbjxPGjaLGP4J+YJ1EFlamvn12+fuvlZ+eotJLkoDfn0Ufo8OETZ64FlvRP9dcFvH907uTx09fN4+qa0q3M162TzbpHYbldIyVe54/s2b3/nF1sI3/Vc40gvQEA/pl+WXpbmu4oyMkqb+jjYk0T7LbyauL3To04I5Vtc9v4mXgFuat9zvCkJjltuKQgG3vayAa5pbXT7G09r1cloNY1VE1z5JM1wfb2Dh6hWeMsiZg5lh5gH1baL1eraIN1ofb2uX00YgQ0B0JSmrOFhcXzV2/eOfvFD9Dx1pZVNJLRmjRPn5g+2iYLhALlRENmWGLxIt9wbbtgJjbA8d2HHOwvep2M1Jzt8Omj7XtbvLP78NkvoWSeJ0c5TyHmL87Pzc1u0k2O1PlYWHyJKFgUaJRCammMg19k7jAFf8qdYiTf790np7oZbGbQQXmyvSTUyzGwuB+/XGxZp6COdOWlxYSGh67uwiLjimrbZmgClBMknJFsn7CkrIKq9r4FMkMgVWs1gvoo1/CCLuy0Gpo3/kJZSkbDKFMhYq+bty06ulQhGalOcPzg4BuR3DZO2+51itsmpg0lhwUW9y0qVzWn6dUyUl9lUixawLC4tPJRKh9LQXrFXEuO83O3uvU75UbK6bq0tzduW7yxtV/n/cu79+45pvXjm1w43xzkFVw3ziL+cJCQ82MCPhsG/OLim9OB32ZLkFL7UwJsI2tmDH06WneKi5P9Zyef/JaZ1c8zUSzNZIb55rTPri5EcYc6XJsSh22ymKTigQUu9qhDPYq5LNL6db6mW2RwFZplpWA2Nzq6Y5a3eWZWcltK0hrGsXs5yU3Rrv5R1b3zMuyBzFqxSCgR0uuiPfyz2hgSbCH5Mx0VxR08lWiwqq6xtWdslrrEl2hQvUpOe2FZL0m4rNdwp1rDXGyfv3gXltW+RGxx2XhZqr2FRekU8QxnrZpV5I3v/3Z+iY1L+EnwVSSMgbS1++pKl9Y0QpcZHhiDk7L6w9+++uyf0kNeaZfXyScbcwICIztJPN7i4rp1sllH5vBlOhW3MPhLYFoDU7KmbVbKmU73sbX1z10UbevbBgAA/m/8yjOn/1B6HXYD2qaHri2gEURLLBaTLRDL1VssvU6j0aID11bVGh78S7yrVQp5XDZbZKxJp9XgTwxBnWb1r/lsTadT8pksNk+MBTJUt3b1U1h1ciGPzeYafxUeo9N+m4E/S6s0NgAZoNc/V6EerSXNyk9m/Xpoy677qfut6LVyiYDN5Ck0PzhvilachMeYGplgSTZEdgVvemp8jibEq0AbQaNUfq8ZcTVsk6u2bCE2QrsN2q9+7epCa1+3rX1sWbvJytEr5d/uCkYvtpq3VW+pZUIOh7/qsT46pUTIYbLEK/sn+kMFWxvY/o92461q3Ba0XiUCHt4M/w3aMVSKH67sdbQquXzDHxiGrfwL5hMAAH6t/0B6AwAAAAD4F4H0BgAAAACwk0B6AwAAAADYSSC9AQAAAADsJJDeAAAAAAB2EkhvAAAAAAA7CaQ3AAAAAICdBNIbAAAAAMBOAukNAAAAAGAngfQGAAAAALCTQHoDAAAAANhJIL0BAAAAAOwkkN4AAAAAAHYSSG8AAAAAADvJ35XeePMdlbV9SyqidwMte6G/pW1MpCb6v48/25NT3a3S6Ih+sKPoRZOVtVMyog8nm6zJ7qQTPcvLOj5lqKq2gytZs7Op+IsNzW0MvoLoX5aM1bSziNf/YyoRIz87sHFOSPR/h1Y+UVNVWz+jJPrX0uum67Kis4ckRD9aN3OZzgVUouevYXQ4OxUxiJ5lBY9UUxY/yd7qY6mlDbaV53QLtvepxE2V+T18+CWveX7LzzpGMVrg7VQ+TfRtRcYqTcqqGKRp0Wslqz62pJ/Mx9+Rjhc7J7ev3YUAAOC/61enN51axGNNdxSnZJXN8KVK1fJsU1pKaf+SSIZ9I6/QaxSj5fHxBQ1TlM1xxKpljWKJTcd7hxryfGPzZucX0GsaRyhdojWWpHfMiyDN7Qh6kbA+LyAkIW+So9Rj+4h8uqkgMjJ3UiwiBtDIx+qzsqoHRBq9lIdtdBqXz2dQZ4fak1IzuoanKVQ6X4LigaSvIDEhu5UhUdK6CyMjwtcJ8HQK/WFE2AKzM9LMLoCu2JBcNOKFsbERg6GB3hiHhxjndApjNjz4df7IEjHYKuy+ZLtXhsFwD+5fP3/+/IUbZkQ/5tmrdxWTWBrRaSXpbndje7j6ZWW1/13PJuayeMT/buQsXtePzOY8uufXhH1k1xqqigiuHpROl929HTnOGs/xSWkeYzOGi4I+hc2J0EbYlGa+uTQppJpjDGJKwfTkOL7syNQMZyWA6tUywcJUU7Kd7Tu7hJ6RJr+3loGFrXMk3hYZTtYRYXE3aYDo24p4Md4tMLl5XqmWUWdG6pNsL56wrhwZ6S2Pf/jWraqrb3KOLFKwKp0/Eivx4f0LR/YcOnb5LtFLsHxt025MrAAA8G/0K9ObXqumjzUkh/u4hWe2tLTimhpKQ52dQhOLxthi/cpRQ6uSNWX4RSTllG6hhyRalnGGOuvw3uzEcFff8KLiEvS6sKS8NCUyvbKHtCSGc7r/eErW/Hhna2tDZUmYu0tMTklTa2tjZUGot09SaRW2f/SNc0VKlXSxINgrLDmvoXVkYrg2Iz40srB5oKG6KCc1ICgkPacwKti3uBc7IGuU3Ibs1Kpu8qYpgVQbHVbxF9LbB/9N0pt8IT8kyA9xtj5z2mFQThQr+AtbpTdEr9NOt6UTUhM939u8t/VNIvrTK3vnVRriwyCjVNi/8Z8SLi8Lex3ufOzioRCz/fSmHop/cD+qd+PaUImZ/d3Vi0Mld03D20c6m1tHl8Tavgw7qyfOccRcFHePMb+NKFooKcgKcbF/Y+kYnYLezWvupijIVTcvP3PEFt7Pz8Hy2p0kQ4ugeKS0MCrc7fGlQw9sPFJSsboSfN6duHrJ7KpdFOppmVRp1/1h9XPpTcgZDX5z7aMbmqrvh2d3r9238fDz83Kzt3rzvpm0sgHQLM/XuD57nVA2IcFWOH+sZvpb+yUAAPyr/dr0puFSJoYNGrPDg+MLOvGe4eHumvy4in6NljhiqRXskoTI9lmi6eWH2MM1wek1CoWMMtqcEptR3z0i2OJvfPAPo+LRSWPEXoB0pgd6RGQ3EH3I1IJAqmYM5IeHZ7Vh/XNCGa+jLLu4uDA7OzM1Idrbxy8mISXI08k3qXKBI0M7mZjHZtPn2yqLsNSwSn59f19RxK9Pb0aU2vu3wuaJnh+kN51GmeV14V1YTg1SVRLp5OD8NbYM66lM9ntvG14iVuL5hlfnZPk4ZRR9xjgt3mdP3nxlZ2f3zvLK4etW6AUmpIv+nROGnKI3pg5VTKLvG2bWp0/Y2K8eHD58A6vTzq9idCj26ZXATGwmCqI+m9olDpF43z7bUkZrU02858c3b/3yKmqywr19POp45Kp7tyNJ+ACzebfMkgammiM9PBLTSmsaG9tQEMcqI9R2d3fV1JQmed949NSnjhhpxY/Tm5rSZPfu9a2LV02fvHTMyE4NskmPS63oofRlBTqEts72JWfW1Ua5G9ObhjFS7fnCJrl6DG931IuZma5fwwt6eD9z2hcAAHaoX5jetHKxSEigFof6JJf1s4heoWCJTWOyRWKJynACVSkdT/CLaBpjEm+vIZKrNOKlkRzibBgmNMjX5auLp5eXj6+vp6dvcGiYoTihbpyBNWEIyZVZEXF1M4bZAP9kwrrYgPTWRaJvxXh5hKenl69/YGhy4xyprSi/iS4Qs+mLs0Nt2JnToeniOJ/ctjmJGNvDJFK5RquWiUWCtYQS+Wz1t7Y3BbMrPDSpfWrzdLURlt5unrpj9oA4/Ya8dykc4xFvIz+X3lTF3heu3b6P1bPmzOmDu6bX3kbVSLD0plPO1z6+evpJ7pxeMpto9zSiZpKJzDW63vTtwl4hSzL11hcIiEf97l564Ne04RoCNY+6MNmc9+bJ1UPH7KvHJucXGQPpL89cNM0extqnSFVetiWk9SPplKMlcUGGM6fT5eF2m6S3lAWldInN5fGGPS9dvmNYuG8ePDB9/Cq2ZpTFZc9Pt/oRpTiza2cO7jt3g+gjuFQM0Y0XVOhVUubcQPBnt7Di7jlSb5LPu6ruoVyP2ORY9+cvncLKKnr6GoO+YulNr1VMt2a+vGUVU9ROYbLQ1xSGyVwYawtytLSLLWdCozwA4N/uF6a3pY7C3FQkLtTFyTkkPgV7nZqaFO7z1T0w3vA6u7B8xnA0VCspVYaS9ZLjg30C8nvJK410GI1cTJlpy4iITskrnl51MP1GwuyqKyzt+zXXeYO/0+bpDbuLZbq1sKyFI1O1ZwUnFrVMUiiDlXnJcVEosEfHJQX6+xb3Tk+0VqclRkTGFpO3aI1afeZUtTRekFcxStlu++4WbW+apbn+xvo6THbg5XPvMwwvkcriTFubu+4JRVhPW8/ckvHWCoyI0m0YyqCmPPqr01fX+Aqiv66ue0qq1mrl1BxvJwvT809yZ3hDhV+CM2jYtX0/ceZUPl10/7nl29dfOlhrP6QSanF2mMOzt/FhHqdP3Xvm6BJWVV3u7/v06SOPKpJ2WdMZY5ZiPAdstCq9TVWEfQhuEa1Pb6n4Z0whHvC4cicyj1gaQnWlv7NNYMXkJs3imqVKz8e3POt/cNvBqjOn/i/OPXttu9rb1xaPrbD0phWOhBJlyDtLs+tnz96wsn5HFLx54pQyBA1wAIB/t19814JCwOyrSE8tbqDLdMsy9mBn3zxpqCo/r2mcIl9928JWlEvthenFq9KbiNRTmJ3q5/Lxo2NATklpOa6yaoS24dgD/nG0PPpEI7HNcAWRXi5+MVlEH659Yq63OjctJig0Orcov7SiGcW2xIoesVKnYM/kFpYtsKXUid45JtZoJBeP5BLpjdddUUHUUF5e19aL3v8brntT0wdr0tNSMCEO5x58iDG8RBKigy2fXbP1icJ68ssH6fgZPAJ3vNQwlEFSnLvNG5v33vGGvvgAh6tvQkli+dJEW2xyXmeR+5PcaT55cHiWosY/I9tMbxphZ5L928SmztSPQXmTaz4P/KnswrKBoe78zJiEnF6OgNLa382SqMYrQtxD65bE8/FvbBo2nm7VKrqzwnyiWgTa5amGKMesIcUW6U2jYjUZlmW97JK+ed4mH3TeoPNjyyfPAybXRNwNVtKbXMYd729jr816ajl3qLOJKlz3daSarIz+Yh9H5q+UKxk9PQtwYQUA4N/tV6Y3BXsgMTyhqBYdR5WcodLI0LiilnYKTyHjk1or82JTGvnrr2XeQMqoy0ytnqSj9CaiTpSkRYb4eSTXji6s1ZwVmDcoIEYB/1w6hZRHIzaaQXeRq6trTHE30Ytj8IRs8mBLSUpG8WBvdWpG68hgTX59bUlCYnhIgKube2BIWGRCRuskdo5yVXojpXgHVPRhFUxP1seFJY9y/p67FowotQ/cC4xNed85c8rpT/lk/fibRw9uXrhw4eKth4a+h7evHj5x7o7lm9C66SWekNXo/yR3dLIi9aPhXcyDW6f2n71N9Dx+nzdK1LuWhNLu7mhbNsJgjlb5+QaPc1bNuXjI88mT+7cuHDp2wvT+A1SJfUQBTajhzjQEe/p01meYf0pb11qH0cib8yOCSsaVy99Nb6xue9tX+LxtwiNxlLmuiU1DaYm/6xBdlOgW3Pnd572spDeNVj5Rm2hL1LjC8nVYxeSGp65sSG8AAPAf8MvSm2S+IyOtYJovnu4oT4wKz6gY5UsEDCqlvywhrWKQyuFJSO1xKekVdc3ZsYaL1jaIjI5t7JuoTEttmGPyFtozcqrmOOy25MCU+vHFtVqzIb3tPFrlUldOXFpDT2tx2TRXvjbIE2dOGRxJc4GfT1BKS88ImUoxXvdGWaRxhdgoq9Nbmn9Yt+HBEArJSOrfn96EvYnmiW3GU/rfSW96vU7KnjHclGEw2J3t7+sfmN9j6Ospj3/wKWIOLY7hHuylJpTeZtEo3wiH/O5GzBA9OnywdXQqYWOio3tYIVuu18u5ZdGhQcV9MuNfR3r9Qnuis43XGEej1ciHy6OCgvNYMr1GTM9yf7Rv/4nYTsbGStUybpL/09R+Lnrre+lNI1mcIm5OQloqUtxe+Nf0Er3YbShy9arK9Ur2WLiTS2zjHGus0t8xYYSLPTVmc3h6q+mbml5ozQh1c09pHyBqRYrDbd8n9cnR9EmV+HVzBma3Lp85dvTs7XvfLli0yR0hKgQAgH+pX3zmVCPh0xcnh/v72ttayovzc7NyS4rzi7IyktIrxtiSLb+1Vyi5pMK0jB4yb+UoJGpL9A+Mzy1ZKznMc016Uwhmx/oGSJteEwf+EbRKyXRbcXJ6BVkqY4y2FRXVkcSrz/UZ0ltBSU1Rx9BMfZBfXEtbS1VFaWF2SkBQcFp2fklZTf80GwUrPL3NMthM0ViSu3dGRRvS1JAbsSG9aSS03p4h6tJ2z7D/IL1pRN1J7mE1k0Tvd9MbwuhJ8jHy9nhv/sT82QdPQ5/n51fnrIJJYqIVyZDe5vDXhG2cOaV0Jn1661I3zcFPU0qord4e7jUjXEMfhtSW5hPgH59UOtjf6ufpXzqGDalTLtWE2544/bB8apMPi5wzEGTn2EnHzjqOlPnj6e3W1bdhmQYhH6/fTcbSm4JaGRthWBSMy+c3D688dcCXDYktmGCKjZ90rZpdEuLhHVHGFGt0SmFjXphnQjlDsqEFDaMXU7rdHlm89Y+IjK2tzvC1evjGzZuoFfn48gGe3taCtjcAwH/RL01vOg1zuiM/JSYstXxgcHCop628ODcjM6GobmSOzJJodD9KbzouqSMpIX+aJVsZUtSeEpy/oZltsjxsTXrjz+XHeQeWThC94B9Gr5d05SWnZBSOMMRa/bJWIaL01qRlF89/u1RMQx2rifQKK+ycIQ9VRIfGJacmtpGkxuveiKGw9DYc7+YblVE+QR9M9vDNbxzCjU2TBIo16U1Oa/Z0D20Y4+C9P/Td9Kamdhe8exvQTf52D8T309saKmFdXERkzhCePDRiZt/onIS4xu3PpDfOQLq95YvMDvqqq8iU9I4sJxuXxjljvNFJ2IORlk/v3bh252XsjGEVTlUEvrWzi/D7/Pxj4uy605vLy9Plnz9EdYgMH/e6GHPXijktucr02qfUKoNkl+t3EwemWqK8Pq327tXTW+fuWn8genH5g4Z0KF/I8//y2q94lovPlU7Knc0JdbB3yN54AlVNaXHziMkvqqoaJKmU4p6MyLD4ltW/+jBe4ArpDQAAcL8yven1OpmAtUihUIfrIiMjwmMyW0fmlwQCxXcrILVmEqdOw8NDYpMbhmjGx8IZ2t58XX1DiLdXBHi5rklvWrVULBTJ4Erlfxi9XqOSsyfa0hIjUmvGxVLFtw2rVYqo3XEhsYV1fQyJXKOWTTVlpZd3s8Uz2ZEJ3QsSkXCqOC4uLDTY18+PeEBMWtkMQyIaL/rqE1U/RFNrVRKhSGnYtfTotQgzVhYVXUs800OnUQgFIjn+iJrNcMZLPhOn2jD3b187f+nqvQernhiCfAjqnGeROtJev3LO7aGqvy3A9tIbbzzI3fbhAzOLDx4ts5JNr/r8mfSm16oF3VmRr6451E7SiAfGGemU1L7sN08+JFWPiGSSmb4S57v3bjnFj0zPdhREhMXkNKR+snob1EEVKuWSoTzft84ZEzyV8VSrmlTz0tKlhUTOjXFBy/36TdKMXLNMbXz5PJmCD7JQZvkqd1Eh4bLoGBqVNDM5OjzcUpnmaxvXTzIUruCJhJMtOY4vTYOKB5akqwOxXiXldyS8Mn/vUI62vEJtPC2sV0nYXBExQxpJT4bn3bNoc+CbAXPz+hUsvbH7nD++JoowD+7eunbp0rV7qx/1Yvk6omPjTRkAAPDv8SvTm06tnGzNxx78UTOi/WFD27bIJhvLOknfml5wtL6KjYXgH0enoo23ZOfWL/A3tPPglKKJ9tLUvBaWnDjAS+ZaKwe+d9xdWuztGV/fnKZcGjPsdkjBjGjLuPYnSaeSvf1bSOvvllRL2JVlcZ1kMdH/Z4nHisPXRQ05uTiwarOfetLzFjojgtKGGFvt/DoeqTvGw7u8Lt/BM7CD/G2e+RNl/q6pNOOFcVrlaH1JXv3syhCqucbknE4ip22LWtBXHO/4/v17e5f0FtK6v5z4cw1+fvFdlK1Wjo4z0xr23rOol7L5bxdrFbMtVRV149JVG3OxKyepYQ7+RAMAAOQXX/cGAAAAAAD+VpDeAAAAAAB2EkhvAAAAAAA7CaQ3AAAAAICdBNIbAAAAAMBOAukNAAAAAGAngfQGAAAAALCTQHoDAAAAANhJIL0BAAAAAOwkkN4AAAAAAHYSSG8AAAAAADsJpDcAAAAAgJ0E0hvYEfQatVKuUOn0eqJgeVmDCpTqTX/lHAAAAPgX+5XpTa/T8FhUrliJ9WhVPAaVKZTiB1elkM3gS1cdef8KNW9xniFUE33boeSPUrlq7aoDvU7JIc2TmSLtVrOkldOnhtsHF74/GZ1GwaGOCwxL/H1SxkRH/yhHqiX6/xP0SskSlcZW/OWIpVOLBqqTwrLbRQpjVbLWtNCs+glsb/0pOiVrdo7ClujWbHoNb2FqnspfW7islbDnmXytRsVk0xgiFSrRKSXz83NssdI4oE6noM0M8xREL9iaVipgUhl81aoPgZJPJ9N52Jr9SUrxEonK1qx8qPUqAWWBjW8EjVrEoi79iTpxKh65f4Qi2eRrTydmzi6wBau+x/QKEYuySJHDX7gAgP9bvzK96dSy7oq4xLSyUbpQL1/qyE8tGZhX6rVLlOGS5JTUlmHtumPjlvh9tTVV63TPipjT/YMzIrWoIyU4b1BADLsd/GF3t5wFPFbiVNyakKDY4hHl5rlCwxmv+/re8sH1VxkjS0TZZlRiao6PTVLDvOy7qUxJ6wu1v3/P4o1bRtvS9wf9V9GyJptTsipR1NYqRFO9DcSmXNHUPsTdRvBFxOzRVB8H97DkknJ81Lbu7gJfZ9fo9BK8v6qxY561vSCnFE2UZzh5BaT3MVEEnKkr7ZzhLy+LOiKdA9M6jcFCLZjKCQ0N/Pr2wWv7QH+f129fvHLyDY+IrG6pDwoI6FgQfUtvGlF1pLVnZgtLrJ1riQ3dILlmHC2lcL4pNZ4oQVomFxoyiddG1WPf29l2PuVcX3FqYRdPKhltIrZbQUKgV2BcIdFXPzhN39YeoZXPtJWmVPTIVMQHWMfrTYisQlsUWegvyCruFf3M33ercduj77yKm9lkb1KNF3tHVvQZEqOaNlBRP8ZgjpQmJMUvivEBAADg/8gvbXvTa8VLtIGqnIjCTq2USG8yBasiObqwbpTGF+q32/gmZ8yO1+amZZW3TExPliWHpJS0TdJ4nImqpLRquvzn05uWX+v3IaadQfQi301vUu6g96sPoeXds/2ljhaObQtbtqvoNJLuzKAn76KmuFsNo6EPlrtaWoUUN8+Md0a52FlGNm47xe5039KbTqNcYizMrUVeZG0zyvYVBIbF5fVOEiPOzQ0XRUeWD8wQfQiZypdur7VFp9PKeJPjHaGe9vVztGpn64hqEp7e7l8yNX9mgbgk1XL57OGa/I9urkmlzT0renu6ylNdzp49e++ROTachV1C1ahUoxPR+hK8AnOa5tnkAWLQFc0pTqZuZejgTmvw/BiSYihrS3G6H9uxuDCG9eR7X7/lV2Qo75nnyImZ/HfC0lt0YGI7eYlNJrZbf1l8cHzxING3wFwSb+PrRi9hTxRl5g6ShTq9mjnbmRUTExPu/9XZKywmpqi4KDo8fZgn1f7Zv5K2ld6UtHznryldVEhvAID/iV+X3lQSFpNBp9NpNCplkUonTVSmxmQ29JDptMXFRSqNht5isXmKbX6laiQjdaXVvbNyjbK7MLaog4T+Il+aqv7p9KbXK8Qc0tTURG3E7aAKCp1HxLUt0ptaxqOMFLi9/lA8LEQZS6/XMUYrHd655TdNSzX4rNOznz65fu/higdm9+/duXvP7MEDvP/+zYtXozoMdUkoC3N1yV533npWD9PUKLGheKsWd6c6WdsE1w6QuavOAv4LsQaS4qICfd2dnD2CQsMLuulE+c9TTpX5RqWNUJjthaXtJJaIOlqWHZVUOcCXyxeGmqoaBpfk2z9Q69UK0RJvSaVF20Kl1S2tTm9+SS1imRJRqTVoWzHGKpxe3iW2rNmdS8/9+uZGgizPv3IOH1pg1sW5+TYtqjXihsDHBXN6LfqcYHsMMRkjUVfMXY9yPL3dv3fdsI+YXT9zKKqTI+JSp6aG0r9cD66enELILOXqk/v/OjIhbbizOMDFNTS3d6g+Jdwg2MfVydU72PA6JjVviPbj/KrXycdrc8p7yDIZrTwusmyQoVGrVeyu+IiyWeZoXkJ05ZjwZ/48QpnMx8z0+son+OHda2f2HTpreh/ve3D7+oXPidVChVbIX2zNdHt09URkI5s3U/fu3vvUpp72slgfX+/mAWwDTs0voj8h/iN/mQEA/rd+XXrjz1ZXlBQSUvwcXb28vINik/OIEkxlXRdrG5cHiakT3R1N+UmxCdklLe2tmVF+0RllbZ0DYwOVG9ObQkDpHxhnCbeoV69jTdRHeWCs7px47pbV3tZUlJubm5XoYvXijUNwZg7qya3unpQotULqSG6Ur5v7l8b51X93a9mTzQlufiE5RV0UdBSmZz5wa+YT7wnmeps7yasPOOLehPtJ3VIuqSUj1tnr09MLdnHYFNaI9v9ocdfOJzK5cOjPZ5odQKec6ykITahkCFVi2njnJnqnyJwftphxJ5p7yBLsFX8oLjQ1Oz2lfnR6qruqrLZ3enFxsrd3miMzDIhRyXhTfQMLHNHmgU6v5U5Uh/i5RpcPy7CotCa9rT5zqlOJWzNCQzPT0fYqLq9eZMxGRecMTPbU1w315meHBzhavYiZxza8pM73Xt4seiEjtTUU4BsYk1fbNIdma3V6c8/rMtQt74p5mdRBqkhyNnv10d2wc3o4vL3wOmxuq93430DZlROQWlycWlhdFpc3tXJ+lNOdHZPTziP6tkXL7w33Citt6mzIT0rMrevux/akjvrsAJ+o5NRw79C0ptaOzv4xBh9bmRq5eG64d4Yh2PIK12XlaKGHQ3KzMXqvbXvTzDfFx+RV8oTCkhRbZ7d3kbExng5BSQkhdq/furi7f3lv8eCBmf1Xw0YMS+td4P2bAzgA4B/jV545xQnJw1VFJV19PVVZ8RFJKblFRRM/eTGPhDEz0N2amxSdVlzf09OdGxsQl13V3T86MbhJeluaqnD3jume/dH3v2w26o1t/jBlbrCjqrS0tCjTy/q1rUtkYQnqKW0amGUNlrp9DU6raG0qiHb76rhOZFZxQVF+gI9TTmP/WPMwizj2cAttLXzyZlcfctXc2dY5joxH6arvIPNYA2Vl2ARKSzMDba/dc83Ae6rqh6fmejsba8ZZxGj/RjqlpLsw2NkjMLmwh8Wc7jfoaq9KCAsrbcb7hua2fXU52isaShND4kqn5piGFa6c62styMjomKKvXPuEEbNGk928S/rnN798Sq9TCxlDPeVOT61LByfzw+yeXjpz66mNo+On57cuXb/3/LMDvsGT+xdHUz1DQ0PfJeWWpgV/rB4cc00uHGcKR6ui/SLj80srioqzghxDq3snK4n0xiqy/uyTmI9v4aI0X7tnuYy16e2p1QtD5fYvbp+ObiVV5MXEN80r6R0Rcd0CVu97v/R/dXqjl0ZG5tdg172RBmtTUrNxKeE+bj5hK33ZFe0jvB+1vulE1P7+7pq8hKjUyoUlPmnEsCv19aX5O4Yk5LcZ+vpHpthCbBeQccg5QV8z2qa3bvXfVnpjsSfi7J7HhLtFVvQxhktdXT7ltFPUOh2cOQUA/E/8svSmVSv55Pb40PC0stY5mkAl5/WUJmfUVaYF+vsZzouExFbQJTLN9v4ylbDGC9KyRmhS3aozpxqlhMvmiKSspqSQohEhPqRWJV3iCeWrb2NbT69VMcqdXrkl9y9JVg70G86camU8OpOv1OnkQvYihbwOgyfRajRCNpXJXhIICVMVzg9sI6ZYfKLfSCRSaNb/pc9pjzN/X8om+v4TFJLF8vjQ0KTYeP+QkmGeRq1UKNVyEaksLX2Co1HIlds836lVKzpygoICw3Iy430CQwwn2TBhocGRcTGJialRUVGtCwq1Yd9CO4xoiSdRfP8ElkbMYgikci6dTF6Yn5qaXSCPF3kFhKc2zC/gG5wtUcmZE+0hny7fNXt498alG6a3P8UUkdgyMZ9JY/OVGr1GIWKQ6XzxUu239OZbTSKO+Wpmveeq9CbSqkRs0sTYsBGFSi3JwdKbYiLd9Ek241+f3iQTuVlNvT2GuxYkcg6DStlgkUpfEkl/eIOyXq+XsEnVpfmDc2ypTKnWqOTcqcKEqNiiLiaHJ5HJZHK52tiGqlGL+UsiuWrra023ld7IPbm29pl1Bdh1b+zZjmSfrHkxmgakNwDA/8YvS2/c8eac7KwRDtGLUhWfQWUJZStfxfK5ltLMvOKp7ZwjUQvbsmPymyclWPJST3VUdU6y1ChxSQWdpYlIalrdttus9CoJszbF6fbx3W7ByV/d8oYYhnNqG9KbXqciDbb8QN9Ae0XyVztra2urh9fPnzp368XL16gHd//SyVMX7r2wtn738UvNDHYuT8oYam0lRi2Lcbj5yL+M6GvpGZkRyn90mNrhmOPlKekF2F0LtIm6uv7WyrSE0j7e0hyW3mZHEwPj+gXbandjDlTkFDUaL4jSKqUMGl0oVxsOtioenc2ebkrMLh2hEIF+G7S8heFBqgi9klMqfcPrZNiZ04SMykm1TitmMqhUvlLGXr87FIReOW+XS/Tguqeoi1U+P05vzMWeeB+0j7x+/vTetSuXnr6wtv8UGpKApTfJYMKdN8Wcf3/bG0Lcc8qXaWZrY9x9g+OwTzMhIcwnMKZmO59rvU7ckBYam5afm56YllFc11wY7uHq5h9JVJQYG+zr27JIDLwNWHqzdotsJrZpS3nM50t3HbJr8b6m3EhH/4xKQ0Peyl0LGiVjfsTwbnNJqr+Ts2NBDdbTMzIt+IlLMAEA4M/7ZelNwZpuqq+pNiovig/2C0vOriD6MfUtHYvYEfNHFMyB7tFvz5JQimYnJqh82XdbU7ag10735rvFhHjeuZbQwZzp6+qewILgZulN1lMch4sOC7C4d+b5F58YomBFbsUYE8UyvYw3k+RpH5bXS0QIzFLaG8uw4jVnUXnjJcSIcXHBjs8vXLcNJvrisipaGKKfOyW9wyhYNbl5rd3EPadSznRBUnIXaUmGt70tSUaLY6ILh7fbZqGWUUgzxJVMImplVnrjFBtrK5Etlmfm9tN/tumDX+Xw8GsNfVnGLAz1Su5aMFz3hqU3uZRdkuiXXTcjFcyu7A7fkdk0PFnubUxvtnYeQXi7YKiP3Zu1Z05VzNHcnnnubENSTMgcyplKIX7mdL7U9lHCoPo/l97i/SNTSokvBkxFRvi20xuvv76+c2QWJSqVnDk51Fefnxgcm0tUVF2SEOz/s+nNwuZLbCyxUUMcLU9dfu4diffF+H557p6yNr2ppONdFYZ3YwPdbV9YvfCPwHqyypvp/+4PNQDgH+OXpTeNhLtAmptd0Vub8vXjx4/+qf0jk0TR7Ow8edHwJfhjQkpXeuyKqDBvDw//0IgYoj82ITF/znAV+4/pdSI+gypcLLJ+nNiz6jbVLe45xQlmGkMdEif4cp1eNztUmT+69sI9vV481+xua3Ht7qPYFpqhSDGc62DxJWNRsuVf3v+5M6f09pJeBo14YoiK1lWQWtTKVekURHpbVosGon1je6jfbjj4Hq1kpLWwoHFKjqK3Tjpel5NUNarVKReHqtIKW1nbecrEaksD9g++dixJSA0pvt5ZZOzJz0R6G6uO+ppUQZPgzwrTULrzXN5bbsqpfMYwjPGuBZTenCNLmrsJPWOTbLSzG9ObZDjnXkwDSm/OT889eGppZ58/wabRZzo+W54/dNU6IattkMKUEfc1/1utTm9J0VlVI8QXA2aqMW2b6Y2gYLWX5yYkp3ct0HtKEmMKOoiKZocKo4N+Jr3pJJyFeQbf+DyjtWdOdXI+ncZeMpyWX/28NxycOQUA/G/8+rsWlrVKAXcuPzy8tGN8tLkws2pg6efPEep1WrVqBZ9clY++m1lKoh/Bnr+B481U+/gn9M6t3AW6OXRk3W5608oWK2KSRvharVxAJs22VaR/+mqT2bOoMd60hj1IBM2eUi6Xd8be3YfZu/u287xk69va/oPpTafV6jTE897YI/
                        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' style="width:100%; height: 100%">
                    <!-- </div> -->
                </td>
            </tr>
      </table>
  <v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">

import Colors from 'components/Colors'
// import List from 'components/list/List'
import SearchBox from 'components/search/SearchBox'
import FilterTab from 'components/filtertab/eventa_FilterTab'
import echarts from 'echarts'
import Data from "assets/data/eventa_data.json"
import rdData from "assets/data/eventa_rddata.json"
import Footer from 'components/header/Footer.vue'

export default {
  data () {
    return {
      unique_id: -1,
      sourceMap: {},
      imgUrl: require("../../assets/image/eventa.png"),
      // for timeline
      timeline: {},
      event: {},
      loading: {
        timeline: true,
        source: true,
        words: true,
      },
      translated: false,
      event_source_option: {
        title: {
          name: '数据来源'
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['微博', '微信', '网页', '贴吧'],
        },
        series: [{
          type: 'pie',
          radius: ['50%', '75%'],
          data: [
            {name: '微信', value: 0},
            {name: '网页', value: 0},
            {name: '贴吧', value: 0},
            {name: '微博', value: 0},
          ],
        }, {
          type: 'pie',
          radius: [0, '30%'],
          data: [],
          label: {
            normal: {
              color: ['#250303', '#255025'],
              fontWeight: 'bold',
            },
          },
        }],
      },
      word_cloud_option: {
        title: {
          name: '关键词云'
        },
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          width: '150%',
          height: '150%',
          sizeRange: [16, 36],
          gridSize: 8,
          data: [],
        }],
      },
      Colors: Colors,
      dispDatas: [],
      totalRows: 64,
      pageno: 1,
      options: {
        left_up: { option: {xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
            }]}},
        right_up: { option: {}, update: () => { return; } },
        left_down: { option: {}, update: () => { return; } },
        right_down: { option: {}, update: () => { return; } },
      },
      searchInput: {
        kws: '',
        dateStart: new Date(), // TODO truncate date to day unit.
        dateEnd: new Date(),
        includeText: false,
      },
      filter: {},
    };
  },
  watch: {
    searchInput: function (input) {
      this.findDatas(this.filter);
    },
    pageno: function (pageno) {
      this.findDatas(this.filter);
    },
    '$route': function (to, from) {
      this.fetchEventSource();
      this.fetchWorldCloud();
      this.makeTimeLine(this.TL);
    },
    translated: function (nendtrans) {
      // 首先判断该Id的源数据存在且可以翻译。
      if (this.sourceMap[this.unique_id] && this.sourceMap[this.unique_id].origin_title) {
        let title = '';
        let content = '';
        if (nendtrans) {
          title = this.sourceMap[this.unique_id].title;
          content = this.sourceMap[this.unique_id].content;
        } else {
          title = this.sourceMap[this.unique_id].origin_title;
          content = this.sourceMap[this.unique_id].origin_content;
          this.translated = false;
        }
        const dom = _.find(this.$el.getElementsByClassName('tl-slide-text-only'), x => x.id === this.unique_id);
        const titleWrapper = dom.getElementsByClassName('tl-headline');
        if (titleWrapper.length > 0) {
          titleWrapper[0].getElementsByTagName('a')[0].innerText = title;
        }
        const contentWrapper = dom.getElementsByClassName('tl-text-content');
        if (contentWrapper.length > 0) {
          contentWrapper[0].getElementsByTagName('p')[0].innerText = content;
        }
      }
    },
    unique_id: id => {
      console.log(id);
    },
  },
  created () {
    this.findDatas();
    // var echarts = require('echarts');
    this.fetchEventSource();
    this.fetchWorldCloud();
  },
  mounted () {
    console.log("123456");
    // this.options.left_up.option = ChartLib.折线图朝鲜.option;
    require(['components/common/TimelineJS/timeline.js'], TL => this.makeTimeLine(TL.default));
    // console.log(this.TL);
    this.event.description = '美舰连续两天在南海非法活动';
    this.event.participant = '美国';
    this.event.corewords = '美国 南海 非法活动';
    this.event.e_type = '外国入侵';
    this.event.toLegacyType = '外国入侵';
    this.event.eventType2 = '外交问题';
    this.event.toManyType = '外交问题';
    this.event.emotion = '中性';
    this.event.toEmotion = '中性';
    this.event.eventSpanDataString = '2020-04-20 18:20';
    this.event.eventLoc = '中国南海';
    this.event.eventFrom = '新华网';
    console.log(this.event);
    var myChart = echarts.init(document.getElementById('left_up'));
    var left_up_option = {
      title: {
          text: ''
      },
      tooltip: {
          trigger: 'item',
          formatter: function (param) {
                return param.data.name + ":" + param.data.value;
          }
      },
      legend: {
          data: ['朝鲜','南海','台湾']
      },
      grid: {
          left: '1%',
          right: '1%',
          bottom: '2%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['19.12.1','19.12.2','19.12.3','19.12.4','19.12.5','19.12.6','19.12.7','19.12.8',
          '19.12.9','19.12.10','19.12.11','19.12.12']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: '南海',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              // label: {
              //       normal: {
              //         show: true,
              //         position: 'inner',
              //         textStyle: {
              //           fontWeight: 300 ,
              //           fontSize: 16
              //         },
              //         formatter: function (param) {
              //           return param.data.name + ":" + param.data.value;
              //       }
              //     }
              // },
              data: [
                {value: 3755, name: '美方在南海开展“航行自由行动”？'},
                {value: 3511, name: '外交部丨所谓南海航行与飞越自由就是一个伪命题'},
                {value: 3605, name: '英军舰驶近西沙群岛 遭中方护卫舰和直升机驱离'},
                {value: 11859, name: '外交部:反对打着航行自由幌子损害南海'},
                {value: 4635, name: '美军称中国驱逐舰在南海逼近美舰 最近仅45英尺'},
                {value: 63858, name: '国防部回应美军南海“航行自由行动”'},
                {value: 6547, name: '美批准南海"航行自由"计划 印度窃喜:中国会忙翻'},
                {value: 7774, name: '中国驻英大使投书英媒：中国不容美国在南海“秀肌肉”'},
                {value: 3720, name: '美军巡洋舰在西沙群岛附近“航行自由”'},
                {value: 6547, name: '美批准南海"航行自由"计划 印度窃喜:中国会忙翻'},
                {value: 7774, name: '中国驻英大使投书英媒：中国不容美国在南海“秀肌肉”'},
                {value: 3720, name: '美军巡洋舰在西沙群岛附近“航行自由”'}
              ]
          },
      ]
  }
    myChart.setOption(left_up_option);
    // console.log(myChart);
    myChart = echarts.init(document.getElementById('right_up'));
    var ru_data = this.genData(50);
    var right_up_option = {
        title: {
          text: '美军两架B-1B轰炸机与日空自联演后飞越南海上空',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: '70%',
          y: 'center',
          data: ["入侵行动", "国家立场", "防卫行动", "军演行动", "媒体评论", "访问行动"]
        },
        color: ['rgb(203,155,255)', 'rgb(149,162,255)', 'rgb(58,186,255)',
                'rgb(119,168,249)', 'rgb(235,161,159)', 'rgb(200,101,159)'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: '70%',
            center: ['35%', '50%'],
            data: [
              {
                name: "入侵行动",
                value: '10'
              },
              {
                name: "国家立场",
                value: '8'
              },
              {
                name: "防卫行动",
                value: '9'
              },
              {
                name: "军演行动",
                value: '5'
              },
              {
                name: "媒体评论",
                value: '6'
              },
              {
                name: "访问行动",
                value: '4'
              }
            ]
          }
        ]
      };
      myChart.setOption(right_up_option);
  },
  beforeDestroy () {
  },
  methods: {
    genData (count) {
        var nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];
        var legendData = [];
        var seriesData = [];
        var selected = {};
        var tmpname = null;
        for (var i = 0; i < count; i++) {
            tmpname = Math.random() > 0.65
                ? makeWord(4, 1) + '·' + makeWord(3, 0)
                : makeWord(2, 1);
            legendData.push(tmpname);
            seriesData.push({
                name: tmpname,
                value: Math.round(Math.random() * 100000)
            });
            selected[tmpname] = i < 6;
        }

        return {
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
        };

        function makeWord (max, min) {
            var nameLen = Math.ceil(Math.random() * max + min);
            var name = [];
            for (var i = 0; i < nameLen; i++) {
                name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
            }
            return name.join('');
        }
    },
    findDatas: function (filter = {
      selectedTypes: [],
      selectedLanguge: '全部',
      selectedLocation: '全部',
      selectedSecu: false,
      selectedWords: [],
    }) {
      // axios.get('/api/cncert/source/findDatas', {params: {
      //   from: this.searchInput.dateStart.format('yyyy-MM-dd'),
      //   to: this.searchInput.dateEnd.format('yyyy-MM-dd'),
      //   kws: this.searchInput.kws,
      //   kws_kinds: _.join(filter.selectedWords, ' '),
      //   include_text: this.searchInput.includeText,
      //   size: 64,
      //   pageno: this.pageno,
      //   sort: filter.selectedSecu ? 'risk' : '', // 如果选中“突发敏感”，搜索时按secu排序，否则按时间排序
      //   types0: _.join(filter.selectedLegacyTypes, ' '),
      //   types2: _.join(filter.selectedTypes, ' '),
      //   language: filter.selectedLanguge,
      //   location: filter.selectedLocation,
      // }}).then(response => {
      //   this.dispDatas = response.data.content;
      //   this.totalRows = response.data.totalElements;
      // });
      this.dispDatas = Data;
      console.log(this.dispDatas);
      this.totalRows = 64;
      console.log(this.totalRows);
    },
    fetchSimNewsById: function (id, callback) {
      // axios.get('/api/cache3/source/fetchSimNewsById', {params: {
      //   id: id,
      // }}).then(response => {
      //   callback(response.data);
      // });
    },
    updateFilter: function (filter) {
      this.filter = filter;
      this.findDatas(filter);
    },
    fetchEventSource () {
      // this.axios.get('/api/getEventSourceCount', {params: {
      //   eventId: this.$route.params.eventId,
      // }}).then(response => {
      //   let data = [
      //     {name: '微信', value: response.data.wechat},
      //     {name: '网页', value: response.data.news},
      //     {name: '贴吧', value: response.data.tieba},
      //   ];
      //   if (response.data.weibo) {
      //     data.push({name: '微博', value: response.data.weibo});
      //   }
      let data = [
          {name: '微信', value: 10},
          {name: '网页', value: 10},
          {name: '贴吧', value: 10},
      ];
      this.event_source_option.series[0].data = _.orderBy(data, 'value', 'desc');
      this.loading.source = false;
      // });
    },
    makeTimeLine (TL) {
      console.log('makeTimeLine');
      this.TL = TL;
      console.log('eventa');
      console.log(TL);
      console.log(this.event);
      // axios.get('/api/getEventSourceById',{params: {
      //   eventId: this.$route.params.eventId,
      //   similarity: true,
      // }}).then(response => {
      //   let sources = {
      //     events: [],
      //   };
      let sources = {events: []};
      var response = rdData;
      console.log(response);
      response.data = _.orderBy(response.data, 'releaseDate');
      let maxSim = 0.0;
      let maxSimIndex = -1;
      if (_.isEmpty(response.data)) { // 如果返回的源数据为空，显示事件本身。
        let date = new Date(this.event.time);
        sources.events = [{
          start_date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            display_date: date.format('yyyy-MM-dd hh:mm:ss'),
          },
          text: {
            headline: '<a href="/event/#/detail/' + this.event.eventId + '" target="_blank">' + this.event.description + '</a>',
            text: '',
          },
          unique_id: this.event.eventId,
        }];
      } else {
        sources.events = _.map(response.data, item => {
          let date = new Date(item.releaseDate);
          let text = item.content;
          if (item.foreign && item.content) {
            text = '<div class="text-content-wrapper">' +
                    '<div class="text-content-inner text-content-left">' + item.origin_content + '</div>' +
                    '<div class="text-content-sep"></div>' +
                    '<div class="text-content-inner text-content-right">' + item.content + '</div>' +
                    '</div>';
          }
          let source = {
            start_date: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
              hour: date.getHours(),
              minute: date.getMinutes(),
              second: date.getSeconds(),
              display_date: date.format('yyyy-MM-dd hh:mm:ss'),
            },
            text: {
              headline: '<a href="' + item.url + '" target="_blank">' + (item.origin_title || item.title) + '</a>',
              text: text,
            },
            unique_id: item.id,
          };
          // TODO
          // if (item.url) {
          //   let media = {
          //     caption: item.username,
          //     url: item.url,
          //   };
          //   if (item.headPic) {
          //     media.thumbnail = item.headPic;
          //   }
          //   source.media = media;
          // }
          return source;
        });
        this.unique_id = _.last(response.data).id;
        // calculate max similarity index.
        for (var i = 0; i < response.data.length; ++i) {
          if (response.data[i].similarity > maxSim) {
            maxSimIndex = i;
            maxSim = response.data[i].similarity;
          }
        }
      }
      let options = { language: 'zh_CN', start_at_end: true };
      this.timeline = new this.TL.Timeline('source-timeline', sources, options);
      // event binding
      this.timeline.on('change', value => {
        this.unique_id = value.unique_id;
      });
      if (maxSimIndex >= 0) {
        this.timeline.goTo(maxSimIndex);
      }
      // Store source data in map.
      _.each(response.data, item => {
        this.sourceMap[item.id] = item;
      });
      // 外文数据构成比例图
      if (this.event.foreign) {
        let foreignNews = 0;
        let nonforeignNews = 0;
        _.each(response.data, item => {
          if (item.datatag === 'webnews') {
            if (item.foreign) {
              foreignNews += 1;
            } else {
              nonforeignNews += 1;
            }
          }
        });
        this.event_source_option.series[1].data = [
          {name: '外文新闻', value: foreignNews, selected: true},
          {name: '中文新闻', value: nonforeignNews},
        ];
      }
      // });
    },
    fetchWorldCloud () {
      // this.loading.words = true;
      // axios.get('/api/getCorewordsByEventId',{params: {
      //   eventId: this.$route.params.eventId,
      // }}).then(response => {
      //   let words = _.map(response.data.slice(0, 30), item => {
      //     return {name: item.text, value: item.weight * 2};
      //   });
      let words = {name: "456", value: 10};
      this.word_cloud_option.series[0].data = words;
      this.loading.words = false;
      // });
    },
  },
  components: {
    // 'v-list': List,
    'v-search-box': SearchBox,
    'v-filter-tab': FilterTab,
    'v-footer': Footer,
  }
};
</script>

<style lang="sass" >
@import "~assets/sass/mixin"
.real-body
  min-height: 100%
  height: 100%
  display: flex
  flex-direction: column
  .r-header
    flex: 0 0 auto
  .page-wrapper
    flex: 1 0 auto
  .r-footer
    flex: 0 0 auto
</style>

<style lang="sass" scoped>
.event-page-wrapper
  overflow: inherit
  height: auto
.pagination
  margin-bottom: 0rem
  justify-content: center
@media (min-width: 100%)
  .container
    width: 100%
.event-page-wrapper
  width: 100%
  margin: 0px auto 0
  overflow: auto
  background-color: #fff
  padding: 0px 0px
  position: relative
  flex-direction: column
@media (min-width: 100%)
  .event-page-wrapper
    width: 100%
    min-height: 100%
@media (max-width: 100%)
  .event-page-wrapper
    margin-top: 0
.roll-warning-list-move
  transition: transform 1s
</style>

<style type="text/css">
table.event-table
	table{
		border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
  }
table.event-table
  th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
table.event-table
  td {
    background-color: #f9f9f9;
    min-width: 120px;
    padding: 1px 1px;
  }
table.event-table
  th.active {
    color: #fff;
  }
table.event-table
  th.active .arrow {
    opacity: 1;
  }
table.event-table
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }
table.event-table
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }
table.event-table
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>

<style lang="sass" scoped>
@import "~assets/sass/mixin"
.r-panel
  height: 100%
.events-wrapper
  display: flex
  flex-direction: column
  flex: 1
.event-panel
  display: flex
  flex: 1 1 auto
  overflow-y: auto
.event-panel.event-panel-source
  flex: 1 1 0
  height: auto
  overflow-y: hidden
  padding: 0 1.5rem 1rem
  .event-chart
    height: inherit
    display: flex
    flex: 1 1 0
.r-panel
  .event-chart
    display: flex
    flex: 1 1 0
</style>

<style lang="sass">
/*css for timeline.*/
.tl-storyslider
    /*padding: 25px 0 35px*/
.tl-slide
  overflow-y: hidden!important
  .tl-slide-content-container
    .tl-slide-content
      .tl-text
        overflow: hidden
        .tl-headline-date
          font-size: 14px
          margin-bottom: 4px
          color: #999
        h2.tl-headline
          font-size: 24px
          line-height: 28px
          max-height: 56px
          overflow: hidden
          font-weight: bold
          margin-bottom: 8px
          a
            /*color: #414b54*/
            transition: .3s
            &:focus, &:hover
              color: #256bcc
        .tl-text-content
          max-height: 140px
          overflow: hidden
          p
            font-size: 14px
            line-height: 20px
            margin-top: 0
            color: #454545
.tl-storyslider
  .tl-slidenav-title
    display: none!important
  .tl-slidenav-description
    display: none!important
.tl-slidenav-icon
  color: #999!important
  transition: .3s
  &:hover
    color: #454545!important
.text-content-wrapper
  display: flex
  justify-content: space-between
  .text-content-inner
    width: 46%
    display: inline-block
  .text-content-sep
    width: 1px
    border-left: 2px solid
    display: inline-block
</style>
