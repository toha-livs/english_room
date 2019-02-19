import time

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

from main.models import Word

with webdriver.Chrome("/usr/lib/chromium-browser/chromedriver") as driver:
    driver.get('https://iloveenglish.ru/stories/view/basic_english_ch_2_850_samikh_neobkhodimikh_anglijskikh_slov')
    driver.find_element_by_xpath('//*[@id="page"]/div[8]/div/div[7]/p[12]/a[1]').click()
    for table in range(1, 19):
        td = 1
        for g in range(4):
            try:
                tr_row = driver.find_element_by_xpath('//*[@id="page"]/div[8]/div/div[7]/div[3]/table[{}]/tbody/tr/td[{}]'.format(table, td)).text
                get = tr_row.split('\n')               #//*[@id="page"]/div[8]/div/div[7]/div[3]/table[18]
                # print(get)
                words = []
                for i in get:
                    word_p = i[:i.find(' - ')]
                    trl = i[i.find(' - ') + 3:]
                    print([word_p], [trl])
                    if word_p == '' and trl == '':
                        pass
                    else:
                        words.append(Word(word=word_p, translate=trl, category_word_id=6))
                td += 1
                try:
                    Word.objects.bulk_create(words)
                except:
                    print('not add {} end {}'.format(words[0], words[2]))
                    pass
                time.sleep(3)
            except NoSuchElementException:
                td += 1
