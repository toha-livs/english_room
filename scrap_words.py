import time

from selenium import webdriver
from main.models import Word

with webdriver.Chrome("/usr/lib/chromium-browser/chromedriver") as driver:
    driver.get('https://iloveenglish.ru/stories/view/basic_english_ch_2_850_samikh_neobkhodimikh_anglijskikh_slov')
    for tr in range(1, 4):
        tr_row = driver.find_element_by_xpath('//*[@id="page"]/div[8]/div/div[7]/table[5]/tbody/tr/td[{}]'.format(tr)).text
        get = tr_row.split('\n')
        # print(get)
        words = []
        for i in get:
            word_p = i[:i.find(' - ')]
            trl = i[i.find(' - ') + 3:]
            # print(word_p, trl)
            words.append(Word(word=word_p, translate=trl, category_word_id=9))
        Word.objects.bulk_create(words)
        time.sleep(3)