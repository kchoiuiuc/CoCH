# Kevin Choi
# Scrape, parse, and format the chemicals of concern
# selenium webdriver used for scraping
# beatifulsoup used for parsing and formatting

from bs4 import BeautifulSoup
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
import re 
import urllib

# output the list of items
def write_lst(lst,file_):
    with open(file_,'w') as f:
        for l in lst[:-1]:
            f.write(str(l))
            f.write(', ')
        f.write(str(lst[-1]))

# output the urls of items
def write_urls(urls,file_):
    with open(file_,'w') as f:
        for url in urls[:-1]:
            f.write("'")
            f.write(url)
            f.write("'")
            f.write(', ')
        f.write("'")
        f.write(str(urls[-1]))
        f.write("'")

# initiate and return beautifulsoup object for parsing the given url
def get_js_soup(url,driver):
    driver.get(url)
    res_html = driver.execute_script('return document.body.innerHTML')
    soup = BeautifulSoup(res_html,'html.parser') 
    return soup

# scrape the urls in beautifulsoup object created by input url
def scrape_urls(main_url,driver):
    print ('-'*20,'Scraping sub page','-'*20)
    subpage_links = []
    soup = get_js_soup(main_url,driver)
    for link_holder in soup.find_all('h2',class_='entry-title'): 
        rel_link = link_holder.find('a')['href'] 
        subpage_links.append(rel_link)
    print ('-'*20,'Found {} sub page urls'.format(len(subpage_links)),'-'*20)
    return subpage_links

# scrape the items in beautifulsoup object created by input inner url
def scrape_chemicals(chem_urls,driver):
    i=0
    chemArray = []
    while i < len(chem_urls):
        soup = get_js_soup(chem_urls[i],driver)
        chemLabel = soup.find(string=re.compile('WHAT TO LOOK FOR ON THE LABEL:'))
        if (chemLabel):
            chemLabel = str(chemLabel.parent.parent.encode("utf-8"))
            chemLabel = replace_regex(chemLabel)
            chems = split_and_index(chemLabel)
            for chem in chems:
                chemArray.append([chem, i])
        i += 1
    return chemArray

# list of regex used for formatting the items
def replace_regex(myString):
    pattern1 = re.compile(r'(\s*<strong>.*?</strong>\s*)|i\.e\.\s|</?em>|b?\'|\.?</?p>|(\\x.{2})|\\x93eth|(\s*<sup>.*?</sup>\s*)|\.\sNote:.*|\(refined and safe for use\)', re.I)
    myString = re.sub(r',$', '', myString)
    pattern2 = re.compile(r'\b(chemicals?|that|includes?|the|clauses?|mixture of|follow\w*|by|a|numbers?|others?|ingredients?|end\w*|in|indicates?|possible|presence of|such|as)\W', re.I)
    andPattern = re.compile(r',?\s*and', re.I)
    myString = pattern1.sub('', myString)
    myString = pattern2.sub('', myString)
    myString = andPattern.sub(',', myString)
    myString = re.sub(r'&amp;', r'&', myString)
    myString = re.sub(r'\((.*?)\)', r', \1', myString)
    myString = re.sub(r'(;\s*)|\scan\s|(\w:\s?)|(\/\s?)|(\Wor\W)', ', ', myString)
    myString = re.sub(r'([a-z,A-Z]),([a-z,A-Z])|([a-z,A-Z])\.\s?([a-z,A-Z])', r'\1, \2', myString)
    return myString

# make a list with index
def split_and_index(myString):
    chems = []
    chemicals = re.split(', ', myString)
    for chemical in chemicals:
        chems.append(chemical)
    return chems

options = Options()
options.headless = True
driver = webdriver.Chrome('./chromedriver',options=options)
base_url = 'http://www.safecosmetics.org/get-the-facts/chem-of-concern/'
chem_urls = scrape_urls(base_url, driver)
write_urls(chem_urls, 'chemUrls.txt')
# chemArray = scrape_chemicals(chem_urls, driver)
# write_lst(chemArray, 'chemArray.txt')
