import time

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

from main.models import Word

with webdriver.Chrome("/usr/lib/chromium-browser/chromedriver") as driver:
    driver.get('https://iloveenglish.ru/stories/view/basic_english_ch_2_850_samikh_neobkhodimikh_anglijskikh_slov')
    driver.find_element_by_xpath('//*[@id="page"]/div[8]/div/div[7]/p[27]/a[1]').click()
    for table in range(1, 22):
        td = 1
        for g in range(4):
            # print(driver.find_element_by_xpath('//*[@id="page"]/div[8]/div/div[7]/div[7]/table[17]/tbody/tr/td[1]').text)
            try:
                tr_row = driver.find_element_by_xpath('//*[@id="page"]/div[8]/div/div[7]/div[7]/table[{}]/tbody/tr/td[{}]'.format(table, td)).text
                # print(tr_row)
                get = tr_row.split('\n')
                # print(get)
                words = []
                for i in get:
                    word_p = i[:i.find(' - ')]
                    trl = i[i.find(' - ') + 3:]
                    print([word_p], [trl])
                    if word_p == '' and trl == '':
                        pass
                    else:
                        words.append(Word(word=word_p, translate=trl, category_word_id=2))
                td += 1
                Word.objects.bulk_create(words)
                time.sleep(3)
            except NoSuchElementException:
                td += 1
            # get = tr_row.split('\n')
            # # print(get)
            # words = []
            # for i in get:
            #     word_p = i[:i.find(' - ')]
            #     trl = i[i.find(' - ') + 3:]
                # print(word_p, trl)
                # words.append(Word(word=word_p, translate=trl, category_word_id=5))
            # Word.objects.bulk_create(words)
            # time.sleep(3)



# //*[@id="page"]/div[8]/div/div[7]/table[6]
# //*[@id="page"]/div[8]/div/div[7]/table[7]
# //*[@id="page"]/div[8]/div/div[7]/div[7]/table[1]