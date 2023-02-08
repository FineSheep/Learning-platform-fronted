<template>
    <div>
        <a-button type="primary" @click="match">
            寻找对手
        </a-button>
        <div class="box-context">
            <div v-if="records.length!=0">
                <a-list :grid="{  column: 3}" :data-source="records">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-card hoverable style="width: 200px;margin-left: 20px;margin-top: 20px; position: relative"
                                @click="getRecord(item.id)">
                            <br/>
                            <div class="img-box" v-if="item.result===1">
                                <img class="img-size" :src="img.number1">
                                我是冠军！！
                            </div>
                            <div class="img-box" v-else>
                                <img class="img-size-1" :src="img.fighting">
                               继续努力吧！
                            </div>
                            <div>
                                <img class="img-card" src="../../../assets/time.svg"/>
                                用时：{{timeTransform(item.answerTime)}}
                            </div>
                            <div>
                                <img class="img-card" src="../../../assets/practice.svg"/>
                                总数：{{item.sum}}道
                            </div>
                            <div>
                                <img class="img-card" src="../../../assets/correct.svg"/>
                                正确：{{item.currectSum}}道
                            </div>
                        </a-card>
                    </a-list-item>
                </a-list>
            </div>
            <div class="empty" v-else>
                <a-empty description="暂无记录，快去练习吧。"></a-empty>
            </div>
        </div>
        <div v-if="matching" class="popContainer">
            <div class="box">
                <img class="match"
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0AAAAHUCAMAAAAk1bgMAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAJHpUWHRDcmVhdG9yAAAImXNMyU9KVXBMK0ktUnBNS0tNLikGAEF6Bs5qehXFAAABBVBMVEVHcEzx8PC9t7Lf3+JtpKPm5Obx8fH9/e3T3Ojt6+zSZmvn6vHHxsDYz83W3etIkG/PgYPe4+vf4+vI0+f+/v3Xpqf9/v7Lv7TJvbPIvLLHu7Hi7v/g2d7X5f7o3uXMxcqqqKzG1vPP3/qkn5zG097Z0djd6f69zejRzdKsoZeoo5/r5ei1rquvp6Ogoqn///7FvLjDwMeW2Nnm8v/Ctaq6tbXQTE624d8FdE+ou8wBAgOXmpnfT1OuzdexP0DnUlWfscABaELdhUQBkmN9jIwKpHRzirlkcHq+qpnS2tgBWDRGU1CNqOOGoNeUr+4lKDHMs0KKn6uWXDDHfkmmmUDWl6Gdq1Wnu5AkAAAAF3RSTlMAGdyT/lgM/v8x+3i1fqj+0L/fyM+eq62cgNsAACAASURBVHja7J3va9tKFoavEZIsaWMcxXE+yNog0UoFQ00xa3Cx43wIZEOgly7k//9XdjQ/z4xkx3K0hbDv4yZx3Nzb3lw/ec85Mxr/9RcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/xOCURQF+DYAcJE+/u00jm9H+E4A0F+faBrvdrtNfIXvBQB9iW4bfXabzcMURRwAfau36W6nBEINB0Dv+DmwGxcojvANAaCPPyx+DvzXBgIB0Ld8i3c6fzYPEAiAPv5cNf4QgdADAXA2o1uRP9IfCARAP38ODbIB2jxgjA1Ar/w5kAKOBRAEAuDc/kfmDy/gIBAAvecHuoBT/jzc4hsDwDn4Kn+UP00LBIEAOCt/ounB5A8SCHz6jv7Pzo9H04MOoAMSCHxyIi+cJcf792Dw1l4PEEgFhwQCn5X5arUK/aPtynw2H3aLjR+3A4gnEKZw4DPWbzMm0Gp25Mk7Ctlvzocs8UgB1+jDBNo9iATCTgTwaQU6FkEJ/80hI4gEkF4E4gGEzaTgU8IdWc07IyiYDS1QRAKICNTwHx//M8AnHCKciKAoPFXfXcJVVwDJCPojU4SR7yPpwJ+JoMDjv5X8jwJILQPJHshugoLmqKvIZySC5i57ZPSxsWA0jeOpj3EFGPBJHR6LoNHgFRwNID7EphEUi78CM8dPJpOb+qZmFEUtKOrmHnv0ZpL4zKMLRxjNHwqDwJCInPE6Gv7weHt0EYHVAZGNPKINmrKESSY3whZNLd7V8pfkZnKJRVf8BK1NjHYLDN0FzY+ZNWQFF7crOJlBcfzvt3+xgHHEoSZxjSyLJknUa/YdTWXfNUUfBIaNoK4Szhu6grs9OAkk9Ynf7u6baq0oiy5q8aaMqt0kOjuI/J2aXGDRCQzHyJt17ubh0eQN+OdYIwQ1Q2D2fPnSkqYkb04oFbZCLIjOHKwF051YvmUV4xXaIDDgU1s9nZrZFx93NY8EkTdPBvxRbVdwXKA4vvumjGE3TVHKz9sO1eaeYM9z6P2/ZxDF5gwGLNuC4TXyk+s0TReLl5c0vea10aA/p69cf+K3+7EwhEhTiDul+qAeJCKJeu5XQXPoJnm3lLslp5hg5xAYliBK0sWSES4Fi5f0nJ/rPf4Eu4I7xG9fefQoSUodQYWtk/q0o0fiA+5fOoaC0xXkjizfYhIHhiSapMydBvGea7RIrwdUyG6BmD5GFUWu/bEo6M3iVyFXiH7JicIJhXxxIbm6hg8RBIZ7bifpUrgj9eEfeQxNhmoWAtoCxW+LLlM6KEpT3zkG1TSGlENHjQ9u1UGo8ihhvJ4KGAj/WnlDUAqlyUCNkNmGwPTJc+lHvd/XOn5yflP3TCiRlkjUcs5sTi8P7ev9MYUifhIquYoPEQT6jwk6Jr6Bn3b4YxQaKoT0KtDbV6lPUX9/en59fd02ojBl+MNKIVXQtWu5kswUauWPgLdD3YXcFfdHRNCBRxC6INDTn3m4Cj1nWhU05Vu3QY1DLIMW10MYpGYI8bdK+rP//bRlT/jttlEnFwbxDJIy5Sccai+2kpHcftKeyImXgrAuosA1sKBnqcb35oRz+hM6SBbanlUovmBlS7QcxCAxQ4jvxsKfvH582nNbSmlNKeVR9rSqObVS1GqGxF4FHUJbVsklUUcAmQja4AVVQH/E5jZboUTXbyvpj/gSmkHLlwEM4jOEeCH1yYvvWxM2uXHHOKVVsrKo0D2RJVFNl1br7Z61QkErgA5yHUidxIBzTECvIso3fnjy6eUTfxysDJqMnJGa3/eF6RuB3pYZF0gqQRwxNZzWp9Q6qRTKrWWi0lle1SnEx3H7vRfZIziTQBtMssFFBnlGE/HsitT8ra3PysqgRULtSXgz1c8gP47vKqGP0aXlkCMT+RqnISqcSu6XWhZSZdyWhlDzYl475zRH1HCgt0GRVkiMoLzlMYHsOm65TNWTLfLnslXq9/S7ihcyfnSF1qa07usKTk7ocuNQQSUSexRqe4tcvd9uvZH8z56KANrpHmjXXIX0gKUg0NMgpdCMP/t96U+3PlYGLa7Fj3N/pr+g1xg4+Af3xzGnkm/HKIlLeqbgRFDZWcbtmzWh7U0kGqCNyB99HV9znBbOogOXdfPeLJzxJ38wP9oAtduglP8jkfnSsJ9AKa/f8pY/zXtx63aptCfbuVXGOY1QTedxe1bGbe+vRiO/8UcWcPIqCqylgg8wkhdy+qf1MRnEd5fyCOqYQ5ypLbVDCcOVqXLnfrdGuqBrO0QXhsiC0Lbe/4jj6TRW/hxsf7CWCj46U1ieFKgjgkay/5l5PadwSUVzR4jCyCuZP/xTK47axVxpdit07DRtlXGMH/FmI5QR8aOuZ1AvCoEmCHyglptZ66en2yCGJwd5zJ7em7RH144+yhmFNod7VHVYRBRq7VGwHCIhdM8E2qgJthnC6cOAsBIELsd/pwNqRVDTkQd+csElDoFvijfLG/VJTj43hVzV8sfM5Zz92s72HhVBKoEO1hDBvDQ4pgjgYrzluxUcaYOYQZd3DH4q9DmTXJlUdY0UyAJraV2CpzJIb0v4UtxtdjsygbPXgXC4CPhIC5S+K5CdQMvLDhgJIt9LdfVmi5JVGfuQ8V9tg5yhgrV85O4zbR0/IhLoW7zZ6TWgg74gCEup4OMtkNzFszrLID2H6yfPyPeuU9nSaDL6IWskytQHbVKuCzreEZlqzuzwsSWqn55+b2tSw/HDe4o3t4AjJ6LiJSHARwQ6uQvBnSI0NVzar+Bh0TNJSzldy4k+RpYsEx+0TXYO5bqQq7on22RrQvH0+vr6/Ns6mpEZ9C2WNdxO3chxjg8PmGODy2cIZ5Rwq1A5RLfznDV3Y/bk0hGjT6ZvlU4e+8G2SO3lId0EWcOEev/49Pq8pVVcISKoY4Swg0DgYy2QEmh1VgQ15yUso/P/5V5jT5at12siUCZ8yqRX8n5GDMrk5x3z7Zw2Q8Yju47bPr8+2mfIjWO1CmQ6IKkPdsOBD5Cck0ChtaP0zJ/XkX+dC3k4GS3dxJt8rx8jYqlAcjKosldYzYVDub0rgRm0pQcCF+WdiSC7BcJKKviYQOH7C0H9BQoiL2XyCH1WXKBchU8rd5x3lWiKlEXtHDqyU45ebrd9fSaHlxZjM0dwE6h5URUIBC7vgRbn9ECrXgIFLHzWFKaQaX0a1pmmonetcZwWqrOUs/aYOsO4svj992/r2Kvya2xfy0D82UAg8MEhwuqUQvYU7v0eKJpU2pu16oFU/dZiTSyy+yMy3nYUai+r2gPtotw3EUSWVIvyXkzidnoRSO8m3WCIAC4lWuomKDy5E2Fl7eU5OXmba3mq8XL8T3bLsiP2uFTUoo4lIXXHkaiUl+iRU+m3j9YZ2uOyaYPaBRzrgDYQCFwuULo8ZyWITOHeXQdKuD1ZNWb2LMfiV26qNx46zY3WcTSEWjd3k0J+JIjcExPsw0vL8duOoGcIuJ4BfICRESg8XsCZGm6xfO/VHoO5yh6uTnNnvDYBtCberJ12KKvWVUaLOXe6YDYmOAqVZknVOnSEKFRygw7kZN+dbIGwEwFcjrd80TVc+G4PxBLo3b1wnrJH6sPedACtiUTr94s5a7uC7ZCTQGVrU0JJT+sRBn2Naf6YzaQQCPQnGI3UFOFUESf3Yq/OH8JFqbCH1XCSsqLVG9Fn3ZlJlRnN0d1xGa3kdAZV7ji7vbNUlHCsCyIGkWXUDS5nAL3taQ6l4i/pOOIvCKQVaenj5M8ZO3kCXxhkqOwAsvqftTvWtofa7saEjF4wVFUd19qRo+jtw7ObR+5jtwNqXisVAoF+jY88lKo5ESSYLF7MboSwM4DIKlB4zgve+9fCoNL2R6yr8qH2OquKH98ff5SZpZV9xxpqV625nNpm6ijkvEIkvcKBPXgXS3/MKtAGV6SCXunj6UOpmn7GT41BQpfOa+nUKtBZlwONktQOIFrB8ZLty+/XvxnPP1Q9Rz5U685dcu15nLzOwTkAi/ZB1o64ssjH3KDNjgYQptigF4kRhB9wMFmMzSROKRSa7OnZAslGSClUjnNr/0Ejybravv4UvH6x/HEqPG1eRULIuebOmcbZR8bRpdR63DwwfpMTBDWDw+VAoB9z7Y88WNFE0EopFOrpm90Brc/fiz3yvTSlAcTV4RlUPSp/fv58yrPMmiqsW31R+0o7+0yF3I0h65QRM0mQr2P8pidwfIiAK7rBRQKFM/nqH4G3GL+Q1aBQF27mo+qAlrM+z7bmOu7r/7J3dr2JK0kYPlGUbAdmkcjMObmgbYLV2JY8IseyGInJEPkCwVpohXKR//9Xtqs/q20zS3SIwkUVhExIlKs881a9VV0dIQPBeHArzw9IkMnrWiIU9Fdd+dOe7WmdEmrNIziE9AVcs4RJCWJvA0+PfPmTPASK98TdN02P+7u5AwnigQapPK59z5aM6tt7/7u+iSwE2kGQD4H4+Xmow7yt6vRXU3x46Mg5hygKIeoUQQIZCbOHgRvkkR80SkrxPhPhbjgMFyLKJA5rkPe0cQqnEHv69s7/rm9Hwfw1QBRtfuJ49keGOtVQMCFnT662ZkvTzmwcuuk7uDwIRuJgpEcR5BSISiCKf4zU8J4XqA566rnmUf/A01/vvRDo3iZlFoxqdQgA2ngbu8JWQ3dQDp39DrqqUbAxIVx1FWy5Uv1URdB04ExsKoEo/jlB17zhHGvQU0hSUTQNmHVPf73zN1+H46MwJhcK0OEVJXftLuuk96xQayih56hdnwLZbqqGKIdCSEkQdYEozkGQBCjM4sILUnnTNADQ6H0KZAWo0hoEoAQVkKqBTHfVINaZOU3xoLY/KYTPNhh8DEPtrdnoVEOm8YGi6O//KIRoFJviPAR16iCsPo1ohFIg8eVdJcNwokcQUJ2zCDO4g6isB1e5Cqjq2HHhKMKk4yOkaZ+TbehJED+AD9Nrf0tQIcrgKM5D0I2ug3iLIfmOxEfID5Xj1dsv7/iLMwJkEjTFSboL+Pm5i8zmBONmtydLe30EtC8B7V60DLWWjAQpHF66mK0lQmRiU5zLnBsbO9sjJMWHN7nI81wiBAo03e6278h5hvqP3DgIKpIQoMPCvG97QRaiqveAA7bikJ8d2YaqNRKcBKlrvJm9dMsMJMzUG0JdfUIZHMU5RYgzVQoBRjyWqVsj4VlrhGQdVEp+6tP/5G7v0yKOi7goUlcDtUqgPZs4fqrfnRFKUUvID8W1nQRsZbuJ7GMClGWrdUYmNsXZAPrj6mYsEzXecO0aNKA+Yi3xEXmTN81ys91ul6cDdMNiE5JHs2iE7VseHNIfVwEdkyC0yDQR5WqVJVHrmHeKb/OO1DB2H0LyVQnQ+iuVQBTnDInQPSDElHGwVvhMQYEkTMvFdrNYLbb/PrFsuB3FDiB4KDhCgHYz77xVrT5q1XM6yI6TsnoH09z73Uagubhg+TyqgVhiL9wymRyz16iuR1QCUZw7kRvLPI4zIeVHrEupPlP50cyn9evrol69ShE6dSL7PuZaflQaFxdQDEW4BtqXk2B/nJEj78JV7fpH5W7RametvMN+MetbeaUJYr4VxOw8XBZcfvKVAKL4gFqoKFgjJD856E8+bTjPF9vX1are7GQZdOIVQUMuwTECZBCSdGy8jb1fTaxz4HxsO7IQJnEVLoCiOhim28xaM3FJFB6sY8F9W2ouzlGUDYkgirPH3UgSxAVYCLIIavi/ntJ6u1jVC8XPiQBd3Rt2jAapTylqpCp+2gKE1ib07jAF/Wm1Yl+TUIEAIQYaxJQG+Vaq9+KYpooIovgoEfomCZJJXJPPc/70xGoZj5vdBvg50fq94U5+TBmknqnppB42AjWAzBUOXoP6VscpBYpaPh6AaAYR8MkglcCZtQjMiRAYB3ZPnP5ulo3IR6D4ABG6hwmEfFr+XYq1zN0enzcQ29e6/HLS/9mBhWA0CAgqwADY7zeryHRXOwI0qapJrwTpBG5zaAH0c5P4HQl+xZWpgqwEZTaFM+M8JtGT747IyqY4uwRdrcppuQThqVfLeuHwWS2ndycS2CdAGiEmWDrB4Ewqh1LnZFDLx+4IkBSz0t+mCsFsEcSUyCgBYv7ae70rO4kcQV+JIIqzK9BUyo58lOty+X0h4ZnmUAZJfk704IYOH+fC2UfhjtcFCoS+Pr7rKl0cugC9RqgGAopYqhM4u5rHnqozl6Zm8rv6uiFNUEbzCBTnlqCv02k5hSi/P28WT09Pq21dL+Vbp/2xXY3jIIWLkQJpQxuNICB2+jI33AdKNj+7ATmcLX/SxKiQEiA2M1WQawRlmVBJXGQsPa1BRBDFmeNG07OE4mcK/Eh8lqUE6LSa+447AXIihEma+AEenL7ZzSNHU7jZvgegXdJSINxLtYabqYEURpKryDRmlQhJDSIzjuLMSdzX5aOqfRarTNkIj8uVVKATLYTrtgcX40TOiFCYvE3c596RbK0YrBegWXCmm8ETFmqBCDFVBZlGamYKITiWGplfSgRRfEwS96VevL6+/reWhdDy8fGxrh/r0zM41ATy4hMUQ5N2CYRUaNIdiEv/nwJh/WGp8+ASv5hHGHpEJmaqCDJllSaIGkIU5wVoVK4gSrDjlstaVkLL6YkC1N8Ecr0gVAkh3XFnUquqc4WdV6BdXw2E7jtJmUbIpHBMt4FcEWSNOHACGYt0a1aKEBFE8RFVkPERpuX3xTPwc6KH/cc1dhCAmQAiLEKdUTh/IKgKh+GUBkU9JsKhjvQ4NjpRBwhpGxvNImSZFiEpQZIfLh+MpaYQkt8mgijOKkHXU4MPmAmyADqdH53BxYXHJ3aJnHezQYTC+gfNI/TO8shH3bWx98IuKO2uJ1UKpA9xYwXKQH8a9YxSncbJn7imoQSKcxJ0dzMcjpwOTcvrUzuONoOzOVxRoGZQgdUo7qmBAglKsYsNjdRdj4ttZuBS0wRiaeJm4RLrYpsjQFqBQILg8KAUIQHbu00hRGM9FOdFSB1vMPiMTjeqhuFJIEeM7wSh0YRJUAhNqqo6eipVUhR1Oqn70l08bAogQ0/EzGqrxLtwGh+rQBIj0QgtQkQQxcfElRSi6+HN3ekVwu046KC6/k/RcuLMSxrOI7Tqn6q1VmTWGoY7LCK/YT4FAw43UqGXynAfSPgiSDSGIcjj1FgCjfVQfJAQvSvsHBy2EQpkwnn1sf9IXfJ2tAfkNluJ3SE4D5S4pXA6kXMJXGR3Kya2CNKxVgwJAemb0CrkCJoRQRSf79/FLQUquu0gbSNgGfLbFft2IqT+kgaBD+WpE6mRu6ouxbc0sMiYCEp/BEYIZEeACAkdRoSIIIoLEKzgJIOz4zA55mmh0qt70mCJdjt3QzKUwEoEKT6H/aZM3EluWwOlahJBedgMCZDysYXO4bSLwOZKfmSAHjE7nk11EMUnF01mGYJtoeKip2vDxfO3t7cHrtO8NEWjcO1rgjxE0UzUz5vnWiR+nyIzCsT8RXVMj8KxWehir3UGZ+nR/CgRgpjRbDbF58YdD3QHdYTCIki/qLtGBgoh/SOpkaK+lYpmEZz8BJffxfDkEDFXm1DgjUQd9VFTcPZEUOJmEawGlWDDAUJM4wO2gvyCg3TNaFUPxUWUQHHYAyrcXDYmCPiBG0sNQs70Tgu3bceuT2QpK9SqOeDFvHIdc/dpLh9wN2uSpO5Aqu+j+laQMeKUCil81Ndq+JRW9VB8agl0HYdnGcJh7BjVP0U8N7fFSYYGg4c5j3uCq9+nXy02lhwfc4sPn8vgc6aXWiUzM48NjVQlQWv1FHoaDldB9i1SIIpPBWjcGkPACLlZHvPlm6ZHvUqE3h4e5jZ4CJFWHQ2PfekiJB9zbn8D8ysR1CWPSIG0/jB2fz0c3cMGL2GaQ/ItqoEoPtlDaJ1G9Y0fNM2j3uEDh4++tVRCZOPNChK3LyZv40aA4j4F4p6feT7PGVObSRlqA8kCSFVCChbwrK9uhmOAqFFEjYkfikvwEIrwLFB4GAhXQLoGcp9+yRjID6iLHhw2Bh790kFIo6PTN/fMNUNMLyZVDBkXW/WB1ED22GRrMPY3Go/Ho+Ed5W8Un+whtAoZn7j5I3ZWh96Q9vxohwTpwRriBiGdunULIFv/hAoEEiSj8XsV7SxcadK1Mcbl9pbgofj8GPJgH5wvhdBZICNDXFsIv374TwFHvwZzozmxV59eC4H7BI5zR49BSDC7lEf4PlAGRRAZbhQX5yGM4ph3ZuGQ/vhZhJirDG7geOlokZQgb8Vxjw9WISc+Xn54oECAkK+C7DCCkiACiOLyTLgQH8QOGsjWcjQfWO1xbvaPkKY3m7uhDE41TdsmgqHHys+cqRooVwzB/RJCHwhCZ4JIgSgu1oTj7Vk4JEVunicu8kGr7Hmxoe+g1wChtqmxDtr+m9cghBASICVC3sFeKyMOJIgAorhAgNouQrgLwa8VcWMI8Hzx9DiKDEDeRtC9oCP1jy2AfAKnnqBA0zzLhUvf9CxcNhOkQBQXF3f3vG3BhV1Vh0+BFOilPwAg7vo/x/w3P4UwD7pASICm06kQphW01iAJlpECUVwgQHHcncgp0JI4f7TB9lFfjgV0gqxzbSqh34wh+DkerD8WICAIuEHTcHRDHcXlAYTGB/pEqEDLfrUL93I8Brn34Bw1RyugIIFzJrZK4TLY6iCcAK01SpTCUVwiQLwjQagf5ByE2IzC/YaflzfjvTnxCbVn3uoA4QwuFCAlQaVASxEyUiCKS4wbbqen8bluNFhaoGVxD4Pf4fNiJxGsic35sRrIdVDdJEJuTWxwsSU/AgjS+Kysk00KRPE/9s6tN5FdicJiMkSwk3B2ODrquTTtJNMmJkDU1gRpMihS9hFSLjygMJr//1e27fKl7G4yr91SLTqQMNHeD+HTqlouu1sIUNG4KSFsbZiHjih/H6BZ2MkQbQAqkukDbz+xASlwuO+AzPF2wYLIgUhtLeHsWk16g6DUi2AYLgJmn2RwWX3uoCk+APvJa/WbL+FMBSdLJnUR9+DLOHIgUjtLuCLJEeIQoZjP/XhP/lyznX3UAYUtdXmRjJJy1wW5DIFz3waJKENQ/KhLH5PP7DDcAxBEAJHa6UBpHRe5D84S2OEibsYdL8W7E6Q8yrCjEo6jZSBtQlKGJkg70Ij+XqS2ATQOgVkR3+UEkRTePZgj/BI+iziwgy7MIPj8DU9ioxS7NP5zrwnyB1tpEUCktqk3Np/1QxVcvDakn7PnZv8RgE4ejb+h+q0IEUKtA/JzpL4Hghxb6cEdTaofBBCphQA57zmUxyVU8d8NJvSbuxHsAyOk+BwEl8DlGJ50EegaAJLubLiSHIjUQh2fe69oShLwHm/nSTlLEXrO8qY9qEVD+BbwcTWcsBQhhGwH5CzID5Ue0d+L1DYduQ99dB7V+16U8+z3Xxaiv2a/WY4GeCw7hyYQ8BpQuobKUf0mzZ32wIF8DXdCfy5S23SCFmxgDqd4Z2k1MJSL7HOWZUzkeHQ0f+cMhLAHFbdAIsTYaJLU1m9K92XYl0oAkVqnvv5cF6gRQuM473gQ3vZTuAm4pP8polNIfYCNyrd0jhTmeNRDBoTK4EF0hBWpdRpy/yH3cXZ0uE7+B4zcb/hW6tD4AV4GiocQUIjAwIGgfJMPciXDLRoIIFIrYziOVz+9EcHXHNkMnnRD9ET0vUfOwNVuOa83QCIsA0EP9OAYssNw6onuBURqn0Z+lbPIw/hn4ccT8sRv8LBOjaMimR9t2MKdLP9AAifsaSI2xg4l3MrFCJogAojUwiYIPtiFr8Biz3HHXMen9gaXCvnDH+Jr7D3xaYroPBHvP9KnCA/+YAQCiNTGJmiM3SIpwgrcF/nvckQOOj8+f2+AJ+wASmew8WE8wI8IXZCUlQuxr8d0MzpS+3R8HkbUatjkRfJTkfxYYIwwPTydHvXhQbyR248hcJcgCFhDfTAXLKUCQzSMTWqjTniY8gxdEA+JdIHXifLIe3ABl66cJikCKuLSBC4xICnMOqrpgFYwT0qjcKT21nDcFVgFT6o3fDZvgW/2U8Sn7iC8UhfS/91BXL7Fp2G7nagMbQUK66huS4MGiNZRSW0s4Y5HnPNox1vBUyNp7JKKA5tOfe1W1Pf+5EkAF82RAj54DgHmSeF0q5KWgUgtzeHsZxvvt8YBtC/UEmSK9M4/ePYgXjdNjuDx86MAjztMxLRA0g+SyjCPre/pSACRWqkeCwDxqHFxKBThNJ2DZ+1EG+ZQKMHrxVsIr70BMTsEZ/BxDrRyJRw0QZRik9oaI0QGxPP0yl1FVs8JaoFBcnx87SYmYYC0nh+AAwkZlXCWn5JSbFJrLUiEmwWjzz6PFnHwkbzJRgW02yc++TqveU8Y3wnVW4gPmIGnoQUqS9pOR2pvFyREaPJzVM+Fjiiu7zi+xVx83Cj+yZ1+HQ+/+eXTxILijUBa+hsG+JQUwpHaa0Hn+gPMDyr37sRRg8MxWcF/IvoaFn5c8cYby7d4jkczVBp8KEMgtVhDJgQXh/EJ+7D9qQbuaN5wyE7ETT11E/EZim4XN/MBnIcnKuGYMaDLwTW1QKTW6vgEPsSNEIn6Ik5eewn1Gm+iJ+z7wSs/LD6IR0b2Y+o3ae5zou9Pd06DPKQWF3GnjNme3q7P+Ic7t+3d4o43uU7eAGJY+Qlb6CQsnwqZzCBABWfv0U0tEKnNFtRjjLmCCu1vs0WWa/nREQb8jy1TeuybJ1M0zF8begI/8GrOyIYbDA9oFYjU7iSOAUJhLE1XdLY/EQlUf2QogSeaO0jiA3eMSLSJwdKjj8c29xcuz6kFIrXbg/rgBB4ZG465kz7sxVH9xXgaPYhDDZQIG7fREYoufDMO5NofFGLDrR61B1EFR+pAkOCswJqCtQb7FiYJ+YiL1fxTtFjKo8ot6zaYDgAAIABJREFUGhx1R1i5U0SSKWz7ntD+QxUcqUsEYYksfcM6RojQglD+IOK9prz+yxC9+fnRFB/wHwWQKeEogyN1QDFBGfpiCUccuRGL/KipXWpofJg/QtEYkIiWT91EgmmBTIRAq6ikrvRBAR9ZVeAMFeYptiN/ls474nUHYq58E46daPqASWdABp8BRQikDmVxhpRKZoogxZCsPulXi5NmKItJCgmDzhVYMCDeVLTZgM8fwFNf/bHuY74MPgMa4yF1RcNTD4Zmx0i9aIak5cnbQ0wRw26UdEnMZ3oMnbzDZG181JRvjiAbIZRkQKTuqHdk4ZDac1busiDJyrlRxRpLOhay7+A2rtJjDCVvwt7DJJq+Zo4h5iu4wWBMBkTqUiP0wSGkWDH4rAxC8GwqugrcSJtRVqMowom5Ys2PXHt8pD1/h8XtD/MOxxh0QEcUwZE6VcZZE1KsaG40Q06WInAiaS2pyYtYvJLkJ3bCeyIu3aSb5WHBgbgxoHNaAyJ1rIw7+5IpZ8ky8J2aHEZgRAqjTIIZeY6EXzIKGLkXadgRzm5qa6cBP40PFXCkTpZxGfBTre6UVvpRg8g0R+BFlcnoKsnCEiha5UHVnKnapM/eWEP25s3sRY8gED+kbmYJX+6+KCl4ND3qWtQhMu4E6YI3IwkFXlgKlQEjgEZbUOPOBWZXnKIEgRogUlc7oS/afBQ46looGYY0S1oLXM6tbEHnWyPp0jrmojaz4OPHDtDJO+6fQ3btGiCNTz6iBJvUWYTOPiye1UNdy4XT3WphQMIUVb6og5oOkVRhSpgMPhRPXkuHj2+ihCrgXmgFiNTBBih8pxCazZ6XSwXQUrvQHTCk3GhRr+cMRJV1Ix/UuRfGZJi5dpWdRG1S4kB8QAEcqXPs9PonR6PR6Oikbz+6vf6pYmg2UxApip4BH6jo4IGqOaR7yBjsihHyIdQXSX+GiEWp8gYkDD8vxA+pUyVbfzSeTr8qzefF+GiIbUgz9GycyJRzdwvvRXfAURNGyo4kUAQQWWaEjxQk8qOKofkgxU8+oP6H1CHzGR6NFTzTuXl8HRR5CJB7/SNgaLZUGC2MGS0CRqYzAogWjYtGlVy5Og7m39CSqvTuE/JroQO48Qnlb6TuuI/GR9vPVKsYzAc5Z32Ely3lbpbLJTRFBiRTzzmOIFeI3Uiu/FpRvAcCrxL59DrzAZzCl/ghdcZ++rp20/hoguaTqa6gXgQbRhZ1ul5/MzZ0ox4L6IpQvhA6I2dFlV9xlW6RlaER7RifymcIih9qf0gdUm80sfhoF5pOBhMdgZVMnuFfOvt7v98ohjRENzfGiFxLtAw9kTcj5ERgQY4e5u/GHVRBgqCHgYR4eRmfUPtD6k75BvwAQcp/lBQ+vGSr01BG9U73++12v90/bawR6WpOf3mOlmlrhNLtTzBzyoL3IHQgi4Mtr6IsX0Y0vkPqkP+cm+QNpA1oMrjSBlQ+rD74Qqqn7Ge73+13OwXRExjRzWxpKDLlnIfIJQyWI49Q5WK2KlOXHQCqXAyn5xYyw8/LeZ/sh9Sl+g16n69gQMp+rjRAZVnK1cJZQe9/e6Bnt9v9fH1VCCmGFESmnJvdmK5o6VgCmMLwggnpVtWX6nP2+e4OWqQFQPXJbhhX3+mJbsXPmPAhdUonU4SPAugK/OdaPsjHi7OeKeKOz/Z7TdDP3e5VaacAelobhjREliIo6RxMjiIAClxJLxuJYj4dTAcDzqQ1JjvWrdxIiHNqfkid0vFwbPsfW74pA7o09Zu8v3+8kOORjpP7mp/t7ifg8/r6pBxos3nbvK3f1ogiqxsLlJG2Jfu8XMhcM/p1Dj43YJWd9F7dmQJvRO5D6hpA50CPC+BU/3M50HcUUfxcXFys8nk+Gg7/3hsHMvxogp4UQR83683bm0Lo9m19e2s4mmmOvulnR5T+0Tzrb6p8+vW7AVXHFFea1HJlvGlVSXZ6MqSVH1LX+OlPplMfwE0iflaPF7cXCz7PP8T8vGoH0ggpC1q/ad3qy5oRkGS/vs2UOZln9cqm3wFUbXOT6dXV5dXlZSkvVDv0YdQnekhdTBDGk+nU2o/BR/NzXYL/PF5oiYKtDUB7gOcfdW234EEWn9s30Hrjta6pUvbzHbxuAiXcRP3fLi+vWX/YI3pI3UwQ1GcZpnes/Rh+5P2j9p8L5UAXt49MfjP8bC0//xj9UAStLUIeIvXGR+NOTwqxvXpsnhxRS+DHzAtBq6U10AQd0dQBqasGNJ14fHz5dm/KN2VA3240Qo8LcKCdan7+sfoBBG0+vmF93Bh+ttvt63Zn0gb1jbr+s91uBqb9+W6ziqkl6FLr+r9EEKmT6qteZAIfZ4PPpcLnQfHz+KjwuTVRwO3tzWy///X/X5og6z8/dBmnCfqoHEdJofMve+fa07ayhWHROCgRlBH0I0I1wcI7EfGW02PFI2skO7YbhNumaSL+/0856zJjjwPdH9NGmuULECFSiT68627EZ4v6A2gV6OYdmE/5A3bhSIEmNkGh6xx1doL6M7yhcJ7xGaH3RvID9CS+P5s+YOhSZc+gPisw9OFYfwAI4KTBKMjTp4d3OETBAB0glAa3/W6HR+3DaYBCN7vg7NRsfA0qMHoccesBFn8o+SY5eQD6M80qIRpy3xCgFQZBRA/KTyqE59Fp8PHWXwUJEBJkQwSfgQenHTiKgdogCBNxIQIUXjmCnJ2W+0byw52j3Pqm8SF+ZjNw36q6rgXys1tpCWrxSVl5KmZH0NXqj7kRRUULECXh2oLtpJOg0BHk7OT0B/gB9UHxwc43FcZafSj7NptFs4ep6AO0axgf5Ed4tn2lO+pRmhp4WIO0DmWjRy1BbcWWJOi+9eFU6DbAOTuh+Oeay5mIEMoPNu4kXPih5HUUkQKVZdMBtPqlU3CGn8qgo78ARUotgky8BPdqoju+v3Q9q60PpyVIuTjI2ckYFoCAntGE+FEx4KNjHzwjf4YxUFWmqRUDrXaiRGMHrurpjwEJJAgQeunjUxTeqB2ZIHw6H84o0A8gyI0BOTshB45zb3pyQeaUus65/yBiCQI9KWyAVuuyRiuFAWdradBXlCDiJ9Ue3IuuGIECje5M0/etKTtxDETNCJxHcPUgZycmQKQ/o5AUCAnyc1SfKI+iGQCUrZGFxgIIJAgBEr3Yx4YIXTiywiq5wiWCuzujP0aB7uwsgkINki4McnYaEdCN1h8jQEoSQXlEBKH+AD9Zg//9rRhotdqTAnnL5VLJ/G0awfMMP+aO9OBNjiam5+4dAaIQCG9Ogpydgg0nyA8RFGACO4wJoAiPKN/mCFCWVeyK2QDtKDGXL7UtACI+NUOtAml8UnNFown3fffx4UJQyDFQKJXLZTs7DQ8O0wcTLgCFrEC2BBE/2Zp8sMYGiCTIW9qGEHmtGgEtZXpglLYLgKA7LT/9MpCJgJQEFXIS5OwE7Ir+A4+weycI7uNQxdiAjfzYAtRwIq1pQyDKI1gC1GOoS8K9xQeuiAhqbdKvorIHp5QcuF+Os7/ezm/w7z87cCGFQFhEzaXPPhzrT6UBKvoA7YUnl++YYogoyd0IOA44EhIImtyx7zgZ0dszPwHS84MT2eqbG+p2dgoAMT0UAXEIxF08UQT6s41wutTwU6Q9gFa/PLV831CIMER6/flzv9+vm74MVTE98pTZuTc9CIGWHwWGH6SrBTk7gSQchj/cPhqoz9QDl1AlyBagNg/d7GyAVn4L0N1bhgAg4Adtv296Kbk0ioMA3/X+Hgcn4AyJHvDbKPrBGAj+HR/dr8fZ3w8QZQ/IfQN82IND/SH52bYOHHcRpE1PgVbP8kCC7noAVcDOT7r2B6FQJgGh1kh6AiBHhnDCoSiN8MHl4Zz99S7cNftv2IGNRdQER4AwgR1p/am2nQBhTLPqEwTu1m+8ONUKEFpzkNOufBnH9KZhoBRwC+KjZNgeIEVq6/Jwzv4EE2fj8XB4cTEYXA0Gg4uL4XD8H6s6rij6CVF+JOkPem8+BEAR6Q/gU6Vm9wEe+x5Au2e1/I0IyR5AghvnTEmoSEUGfiKmK/DAEy2UFkMOIGfH98jGw8H1DUTklBq+m5hE8c314Dfboi64+hPGCveDSt3+RgK0Jf+tEjQ7V3D8Uop+FLRKfidB+RuAyrLQ/XHYkJBWVZQneeIn+RN81AgRRRgKgbRVLghydlTpGQ4+4VSnNl3gn7TllneX5Q4Dct9iCH8SXCACB1V/Mgx/tlUmRKHbqElAynJ94MQlv/HivH4MVJa1ESHdYgo/MfN9nxtXkZ/YIKTIg5PrS/c7dXY8G1+HViUS7b4vRZPJp7eZ4bNPgfr8OebwB/Unn1H3ASawKxQgg48GqK53h2HQ8l2CvNqSIIH84KFFqOCFIxUEW/COCWb9ZKdBpEJKNpcui+DsaDa8wU5mKb/hiS6Qhijs5Ajk6S1BA6qeAj95/sQ92Cg/tKAX/TczetryU4suAtJhkFou3iSxl6YOhLZOmR6eITICVLw08EY4O8FXHyG1bTwHkLOj6c/N3SSU+ffvFJsvMIYwMhQahuCzT2dvfTgUH0nhiB5DRXx4t6hoOnwKDVDdzyMQQW8ZWnjUrb3e73/umyJFcmrNDwdBOCTUVNjwwOZ3uQSOg9YbB5Cz4wkQbocCgr4CQd/N/0Eqr1j+XBjKN5mt8yuIfoAeCOX9XM/PZQ+4xMrw89I6cCkP0R04cbv/qX4ubtEBVNfcUkr0dQCZKbt1hi13PlPkWxqkZNRsXCHI2dFscEtbCu9DyX/Ic6xG6gqlySuE7/bHDGPMHqAAPZH8+A8P1L9j/LcX479pAQLP7JAgSiQQRAtN0ELyt7Lr1taAGKCStiXgjrimopITAeTnOqeN2YQYBKhxADk7Wgbu6ssXWjiNz8XC3jJF0U/YJuM0P+8AdAYeXBI/QQSEAM0iwifT+bdeAGQAsjNxO52KW3bJOBIgDRAzZE8F4U8rU16SUDcoQUCQT0FQSxBYtdk0nxxAzo6mQF9as5cNWAs7cExNyo9DsHEvErr0UIKeOP7J2H9D/SkMPq0AlQaKPbOzMwxhMntpOXILLAMBOyWfHT90I58Of3a93qwjmpuIeA8D8pOg+1k1m83WAeTsaAqEAP1LJzH0xez+5N3teuEaunZfc/jyZmCVVc88L08SvYjnAfMHIEFCpC8HDlzR8mOXU3eGIMl+3IIkaJFbLpyFDy9GQEeOAKo26MRhGISr6/P8SScSkJ9GOoCcHTEG0vpjUaSfADfBpmfWH/kj//79HokKB50KDT2R5fohJlRAzUSlNaInQC0Sddmw/Oy6ZDalzhc6Elooj761LsvOhWs9OJQgBshbbzZEEIZBVFGlYSR4FcgKXAzk7JgA3XbsMD6aHxxXC7UA4aRCSJpkbY46/yjKKqMtVplPGWzBTlbRBUAcAZWaHwiDdp380AcmSC04m4AA0bciR23/gS6hogKRvtUeSg2l4rikChjLBF+DV2XwwY3UOfsTCtQDqB33VEr+AAn6lkvOKlg1ofOhV5aiyvT4D09jF138U+oIqOwyA+kvEwPtNEZTuVBUEQKIFtKjb65ef+5fhdWITUeZsguHAFUkNlGXSshQfuC1PFCuE8HZn1Cgf3sOHHpwI+Anz5UpsgR6Cai1+GZ8KTDYFxD6oNZQuvmlbeHBxHOXQqCKqODRIOPJ4X0qCaEFlVUJoLYRoeshLTgLxwCVABDx0lTsyFWsPvCCHwTSAeTs+ArUuXCPjxNFT8uifVG5wBCIThXQFHVvge75+KMnam4YQISsGaDSeHD2kTZrW4Ho/iyNGycXHnzTKzeS4jQQNZLq1Yo9gLZMECCDpj/drP1AxZ7rxnZ2tCzcxe0BPvgM7DzHJ8iHtGbAq7tWM1zAg1BdjcdnZ+fm7/zZ8FIz1HbcaHzo6uihzDRox66XyoZrmvAoAhygQAL3IbTN2CWDiFQaF64owYfLsrXmprWmwoHV2HPzQM6OZhe3twcA3T6OPG8SSF7v4dXC6tUMglGAjT0f5h8+XF4OBlgdGgNN4/FHhqgbIC2NAtUtQZRYq3KPCTJB0I5mvBeIz4IUCKcZ9nw1BksiqNQKBFiBD7fNqh5BzTqKYxWoyHlwzo4I0KNFEHyKmz+Xde2ZljSQjS2lsWlrvAxHGBfJfP4095/mczyfACbAaTC4vPQqiIVEanSjFSDrlnqSCWKGDETPCSC0gGBIlCVHQHua6Da92JSAMwqUYuYCLAM1M95bU0VJrOLPIEBuK4+zPwSQbkYIarufpiYNinx/7kdSK1A+9+d9m87nz3BMpw8Pme5IQEt18kDrDwG0iKq1ScHtTCiEBCVwiLJ+1fQQQAwjAcmuHAIEWBI/Eb0TPus78pNEJZ8D9Y936ZLYzo4M0K1pQ6BnH0xU3SNIePTYYAQoD2iTLwA092cM0axFaDabzuDL6XQ+fZ5O6QLT80HIE6Wx8Ydt178MQcQQeXH+/9k7t+a2jSQKly1oC0ls6yEPzibkEhJQEgQBKIIhikahUAXHNBmuSLm49v//LTunu+cCSrJ1cZKXOQMCoERDfuBXp7vn1sz6Wa8gW1P49sWGcB81RTISgVZZJAtquSsoQjdQU1VVkrY+A/L6ZxxINpE/74KB/6h8Q33ld7XiRxHUnZ2FF511oIxPlwXQKepqOp3WdZ1DiO9gSkOY2gKzV5fL/33+Y9j+uCSC1F88+eLO6H5nYzhMS6UiAi2ywAApgmh+d13VKoCbRCc+gPP6+wEiiGTznbAf+A/nQA0MSDlQg+ocAFICUgwOgZQVdbLBSgmbTZImaapek2QCVZNqqtCqFV3z+Tyfz/9UulSvH//8/OPnz591XTtSfwZh3vqLJEHX7yw8EsS9ly2K33+gIE4IqjEwHPwEx76C4PV36pi37tWDSKkTtbvtQM2+jMr9vm/OQjgQ2VFGEFknylOFjm6LmRFGGHRGWNONAasmjFf1dvrvXxVUc5UHNQGSJ06BsLTvB613phhnBqquyYLiGA5UTxU/Vev58fq7ARrrrUd5/+srRVA3jOECTJoOgtUes1bD06RTRlGw+0RsPdwq5T8b+A+O2QMErhy4EhwT3ExSWFelgkFMF2+XxoA+yIy6/wpB4CfLorxW/lPVgS/Aef1DAP0ue4+SA/WDCO7DR5qvtuox6bu/CC8aMiBByJbjahhPKAQtFrOnCgMSlJdBySZV4WAaSRHinXYgTdAXEJQV4Gdatydu/QDLRH5tYUgvr++hfx3Tzr2/gyKczs+vxmfBIIIDQBiMvaNGg7MFn0jX4SgNShPgk7ANJckCTY7BqiEPUQUIU3pQmlQlChDxZdteUn18fX1yff2eFv29Xi4BUF5HCjCuX9MCqz+9aX5uttufmzf3rAvp5fUdHehc0h+cxuMwGBYRTsiByH/6XdM1fR4Z3zH+k1ec/NBp0dkIzcl/aOKpJev2xgxafZUIPTChprwcKL68bE1n03IpfU6vjl+8+OH4+Eihs73ZbtXrBpdtc+Tr2l5/nQP9RJsmGoQwDvs0GERwH05o57l+SwShR8jYT2QRqlNjPoMKwv3Zz4GELpy4kodKQ0IGpOI05kb4iQ+AattyX755A88BN8TODd8o7RpfWfD6i/TiqDpTUdtvZvvr8cCBmKBVzwYEhGgRUubHOFBU5EU+STbhXSW4J2RAXWoepMK4tMFC9eAmI3YUPRndZkrUB4T/2VY8h9mRM1O03e2OPEFef0n89jKqx9i49zfZ/vpqfB6Ox0MHChgf2rtRXZbLNtO9QCaAi6bWfiiGGwZpM24PVFCZREpZUFXul+uWoKFDpMCZ9b35N9vtjfaerYWILQgEHXNJwYPk9T3t52UUVdj5+grsnP82JgMah4vA1hA+gh910LZZ+xIjz9bI3LMiy3QpIUcAZ+hJVNqjJ8jZ6AxE3Up/ZkLXQP2scR6WKANaq78HglhY1be/Bd3Wus6NhYjToN1uV0YYQI4hr69f+7qC1/fIfn54hQXdagDECDE/5+HZWSKDsU8CGoUAA9pTsr7W4txdzAgBnPnGb5KHpT80AdXFy9JljAzZUA+AND8RorWbwfO2Crl+v9rpgM1xIDEgALTilbtZxWtPkNdz7ef1ywhLItYhEyTuMw6xef1ZmNA8bny/mZ9efYvXdyhD/lMggKMUKHlOAtSxbwk5G97GEQa0jtl7+gZgHMATBMEKkvDtRlffdD2B+FEWBGXUFEh+zqrXM7OfV4oeASgEOETQ+TgcYwvsU9WwBWnS6RV5+r2FZmltqIX9FDm6gOjrziY0SH4eqz6x9KRiQJeIGKP+5oCfmYaHAJLitYVH7GfL/GRlXOKgFVD8wldez7Qf8JPndV5j2/hxyOuRhrSYFfa/xh6khh92ICLHgQfxm4JHPWfixFwLd3TOgmvTyUHnDxZQvA+tPmiSxDDUkQG1lHEpfi4UQAJl77CzWu12Ono7FNnPrmf/4VfbLks/Z8jrOdkPvIfmHDBAZ0AH5qMajiQ8ZQPCooq7/tCBlm2bSSUOAVztZCz3BHCdjs90bUFxNhirkAhcs0Vnn2UyIEp/CJ8LdqADeO7BRrQyBkQndMG+9J2rXs+xnxxTdmowVCdE0BnHbjg4gKP9400A15dLx3hosk9eSMtT/Y1/UhdQNxhT6mxij6dV+z0ZUJaVCOBOgZBDj8vObkiNQ49JgHj/cCyAX3qAvJ4osh+V/tQUwOU55pie0Yv8J5Tdt5PqggsJjWNATA+thBBR9Ibz1M35k6clPk4GpB+26SSCQ80ctWuqrcGFhBShZnsbGdVWO6fty5L9hxIgmkPkAfJ6Tvaj0IlqnjpaJ4ngA50qfk4BgkKoqzrDD6VAlPQUxnoiOtc23gI+XbcYBmaJs3fJN8kyGRCrQr9Ti+p1oNqM8NGdOxynbYfcUCPXcfhZaesUA2rb2IdwXk/Nfjh2Y4hyIBQxQmJEyn9CKSBU2n8Qvy3bWCI2OqGCx3cTp2q2uDM4czpVk8WQL9upKkMVGq69cSjXSQ0bgw6CWRDMnL7RrROjOeTAeg5kcreWthCneeCFB8jrSfZDm2Hlgk6NyzwvorrC9zWkBu9JMLFN+IlK9JhqehidCItakQHNp7r69rgEqHPxsmNJhyIDWmYZ84PRBsLPgenchQ20dOhZr5bsPxia2noH8npK9kNdp7qJA1EcpxjCnM6uqmjv7aaqaPvgqMScAfGeiHuO8ghrwUUSxmEQthPBPSf9AVYDfrQBlWw/QRBwR89ByHaX1mjQtaYH2Y/4T+xDOK8n249Bh2I5Qaiez0FRUUSR2XE7pmThsigc6Ao2MBqQrbuACBxDUOLmPXqWz+JRnaid7kPVBpTtA4w3CAIUDvrt7ivkrFdCzrWIax8tj+Ph/KeN47jw/UBej81+Iu08RAiuUs1mhvI5r0Yl9WmT7PCABTTgVeDCr4jG8HxDC4JL9/jcguvAsvrKuI8exYMadhmIjPfcbzrX158sPLTylQyAM/kPCPI7CHk9jp9jYz/chwp8amJI+lM5oCNnqjVJTA+gIXgIoYLnA0Uc0aW2BLf4FkuhQ5TcXRBQoQarcx/SdbYTldxwuVrdNp61DdeurQSdOEb1WuiRAlwWx96BvJ6S/UTuK3duFEi5Iclhx35QxW4WH95VuEAVbvJVdBZfdaaviaK4phQDYoayFsDsD01nJabzyYRsGh1hJy6d+I22Qo69A3k93n4MNTXHbzY0Y6fh4rbgoX9pRCYkKMF+KCOqQpE1mHvpuEgepc5MBDKK46WprVnTcQO29Z7Q0bajBx/EpfafkuhRijxAXg+uHhxJSEbk5LnrRLXkRDlDkktqZM1HagfsPZG54QguvQpVO78KcQlxposV18Xv14VzuXDdRyHY0UxUQqfQAClI2HTceI0CNkIH0thojsSAWjEgSLmZdyCvB+v1tMZ61UYyhKeWaoL2o0FgJ/GbjtdynQFprHBb5OloNLpSx5XiZxReqRfOwpEQFTpvb5EVDp1LIOKOKIrgaOZryWnQ0nLz6fogYItj4zoyaMeEbzJ+1DEg9TQPkNeDDejlVFRzG4jHIxh+LEMWH01ONPAgVOiS0eZqMwo3o406cAJB6qzuAdPoKlRXRQ79/D/hSBowE7IsZnoQhGbLlBAKOmI7nc+QQ66T6YgtM/MVMpk6F8uPWycBYoB8DuT18ALC9O30QPWdLLE3mUQot75juCkiG79hGPaIwdnQabT5tvhzAtyID4Uck0VojUJmKyn3MKAii9AKKsTh289jCdQ9MeKQc4iQyYF0/a2MBR+lI/+98Hqgjqdv377l1/QXguluoA5JkkKcG8lZfOBJeV6l6SbdPEN2+apb6koYEPjJCmKI5jQgnDPkuKyYn8WlM3l74D+tCeCywq+h7fVggAgfSxFA4uv0fpCmboyX65JcbjyIi3f4oNKvOFVT2WxBKZmk6STFmm4bAJZayOgH6cFFn/RHEvUv0pomAimAiqgEQSUaDs1NZu3GgSiS9/Rplx/jP0ir/DpxXo8BSMsQJPcME3nSLxqit4KSJmpoTIM+IntxVM/ruVI9/5XDRLBVEV4CmEIrTUwDPCmfNym952vSkAEpYssowlEyPQyS40DyG0MRf4jeRW4HkOM/2ZHPgLz+z97Z7MiJLFFYtmVLI7XXROaqJO5iSFWVuBK96s1d1vs/0SUz/hNou7vxzHgUUW4KKIqekfl8Ik4mxNtSuD4MSrPsEpok4JUk76rTfK5mUIl9O2TLxXJdKl7P659c0XoGEq7/WuFqvYP+8+f/qoddBQ/FByEqhAfpEZJCC36tB11EiIwBJ/jcoolqxFsAAuUG3BuTA1u8KkU7Od4+THUmw/Xa2w+mbrq6IVpRLh8kXOur/YrLy1jRaTSUy92/GCPm6KLydLcfi4EwNv0pjaDgJ+KdKdyODB3vlxwPkCfYI+q5p4lLJseMm9DAPoQ6FKpbl4vdfbmw+FQOtaaJAAAba0lEQVTpuVAR1MSISJIdTA8ddPH83MW/rvoTdzJEvMnGHvZk510x29eOMPUDtlwxGUJ0LkPjoHf4JArTU4gX3DLpnKiR+UQSvIstgMYXGf8pt7gTKOKNAM2eni1IcLA5W3C8YBFCgNLk/IfmQDSU5s4W17kOjNJ6nd8QpHJRqu4sMFT+lDvnceUiaRyqkqB0F7G6SEZHAnR/MQNAwU/EWwGSwgcQjg6mA2WC1/cBL+aBPLztCNPzK8J0sbp0a9isy/tNhOmuf+xqEbIELsONUSU1sE3+FvxEvF+BYDAk/Qghd1DdmndA2imiZkFJ0rzheCpRN8hEwoRQYKKHSN1vBiK2FC6GmG7V1D+jzt9Z+YkB1Ig3A5TXyx9Qf+oS18GICGHEB3QUwQas+poNflsXD3R0yeZ4m8lEG2UiWWo3TDRJMlndzclRYcvAJnKSzGH9c/f6c4sJCBHvAki5QEis6sCws9mjBH5BEG2Ubatj0FBbEcJX2nXFpWjq7AdUphuOpd5UdVhw0F8oRnhUf0iA+P6fMfQn4gMApfXiTiChl3fbAEMCqDQZ5mQ/CDq8n2jr+JxBDjEnmoFEqb3VGUBEFA6sask0S4rnYKL0rojv1g0Q6crLXfjRCXDRFSjiHfEpA6HRlAh/DA6DIgDEiVLktYtg2IiWyJITN/D5oVesWlW1F+gIU8YFiANRlWlTMTFLmtDd2fBmpJp9fTfyU+Ma/ES8twZC9Un4kxJRYvev6wN9TuAkVJuE6A1MFoje9AUQI8cnkCRuALBiRd6dVGZVkVCaZnAF0zMixSTtlUx4k3m5uGpoJAFi/cEJPDGBNOJ9CvR5Td9YbxAUvM6TChKncyRPvJ+lCRiIpMdbWTKZnfcgFDL6HU6pQDdATobC1FQJRJZ+4uYLnvkgM+BGUaCYgB3xkXjKCSM3qVlX1sVQhYgwSrVGWnevP20d6hpe2knLJtEnvPoTKVfS/BCFDPCrLHNJ6JK8kb4JCT+sLgMSXm0GwbEKZa2R5I9GPkSpktQMhFEnwKEAxQBQxDvja16WJVNUjCpCiBHx0n6SXPuNAuKlbdN7lS7UMaljRKk4sQPoqiSwxkPdniuLWmDZiom/3BI8zOyAvrOuN4iSOg95X5auF1IgO4AaM3giPkDQ58VGlkgZcWKeEslK28VixYVTOwoaZnRAYuVJadDUTpNFtvma0IDJ43QrIU0gxVLVIFGs+ovnKo4sbrCyAzCQJY5I5brMZnrrxSVwyM8UAEV8oAz6+vXr9y9PT59zXnzkRVjKGZQiYopkKknmR4JExLSrvxFCGJHe6IAtFVpYPyXZSycCPdw4hUm0Tg4wbvqKFJ5mrpqJEAlH61uVIH5+gvBT4mnyER+Pb98+/fH1IbHU15E2JdQnlB4SnAS8SoIEWTjDjI9g43esm6qF0QaiEssViRjXQqAJJSiktKMZICklqp2SVG1seKyrKzvtq+t7ru1aRn8D0G0ax6iBIj6KD5raj6lFfTMsdSjlJfuiCSRvk+pILn4lp17leK0nBakCMbSl+OjoLWiappaDnHbAA5q3ztgMSRlqp+BsLzWI2lbKy7VUdox/MNVn+QZAEWfEH5+nTTiYlsfjsGLKVDPlqj0SgLsyrwLLEq0PLFnJDEZZIBPowUbE5JCZsEXrkPYibXyCAZCgOSNAL6PqT4mnyUf8UoCOWGooPfZoSvSCho7mcOw9OGDo8yQ6hYcoYqA5oYhckvM0j51QqUo20/HkgtO4MGd7DSDnH5RxGuNJihHnAVSmcfqp6Gmy2mSSPFYnhKpe0MhUW2IKmGmrXu65qde6XF94aBbR4iKLfYysUsYQCm4sV3UX6eFaCSFAaiDcyhT9TCLOVaDSGFpftKAYt2A99P3hUFoOUWoQAWLCQ045seSwICEBuV372WV4xEQ2ooQKxHomiidcNf8go0bl5ZkAwifArf+vbSsUKOIkgJbmZddGdKU0bsb2bzThxG8/K0xdyeRIQiuPVmiTVvutBkijD3B/W4Fkiik1A3PDSHLAJmIVRDwfKRDmb7eJ1CgAijgHoOzu16kwOZbK1OghhsZjhA5QOsLJgJSZp4QXPVkSmPgB11X4SQY1yhPKFaeABivK6jxAqD9jCYAiToxP+eCJO9DGWGtf1HrVTfwvd9UmQWorTQ+3cpTlbcw8hAkFKunIU7ZyhSuZVmiJJZPYGAxmJv1JMwPk9ScAivjVAJm7SDPr0q0p09ikibO78lpmRyuuZOp98U3JpOkdKVLL5DILUc6yG+goKn0y4EhuVSORtOW5+tbqXwdAEX8tQC4SFky3q6KEqqQZ3qvCtLEflkOYkluV6oi3eeYeD0YRMKpEpEPrf20xA6gCUNzNEPE3AOTKJdWlauOpi/dD20GU6TEdTX7IvTJtNSqZ+a9ZsjrK+eij3FK49gTFG9sjAVDEiQB9/vgDSttoC+rSjXTJvOzbK+ne43jywwFLaWc7bY66kgI5/QmAIv5uBToSpiTCVGR8aRotPeN0LFKeJJPjPfad8T2qVIGaAC03LYBKABTxz1OgvchcLxFMlORNb8ryjC2+HAvT8lqqV2djk/5MoUARvw1AnqaUabQWfbzm4hW8pKfp5yomr0y9MHHJtHQ8LahAG34CoIjfCCBPU140xzPjSxPy9MN6yVl5y85dTH4yUaPWw1PjKQCKOCO+/eUA9fXSYo08rpZ4Rt44+ffOFO+VaeuKt9OX0Q4BjfdQoIjfV4F2WzykZHK8wnNbRxalVyRpd4jJitLjcauncQiVl1CgiN9egQ4mPlhdqkleGWnKAzsP449mPvhJRLdxm8GVACjiNwbosKlX8uNLwhLOfBAn7yfGlVqQkd7nb7UGir/6iH+JAv1UR6+cnflgJImB2o/S+ClhIkT8C02EH7Sa7Nt+8YMZrS41kZlGvoOpT/AO8BnHL/FXH3EKQE+/GhI4Q472iKMcT2cRlaY3uBB+Sp/A4Y54NHbEiQDB2bkXuCZDXVsg174LoOt/Apv2qwDDTm+vrhNRMhMf9C7AHf8gFCjin6xAfb8t33ZovwdKx8ixbO33D+++m4a0XFuFtHEQVIcCoIjzAALbIBh2Wzxue6PafiWbHsW2cZZVoUGas5pmKFaXbOetAbqurLBRKPPrTVsUyPmKkxymHQOuhAJF/CoFmjdLbHmlP73GHAFnyIM+P9P2P13/SOia48nXoKfNiBl0XVrrA+HycjvI3+6RwkWcChCYdo1aqsxb9ZEPoOvQPbh3l72Zft99MQSgHbYMIQBds2P3H2d6iw8eMO6G0p6uaJ8GN9r7GEooUMS58bSbhnlNgr2dLjHTLFCaMXjBsNzs/CqWI+1ybJt9a68gpgdsdudOjM242n2oPT2yVcbyPf7mI0504WAwTUM2Jb6v91kotFWqKpBLteQiB9NX2HYvplZBtqOWNDLmZ82Dw0r6myhWIkjaGy9tFMiKT3vGSAAUcZoCbSwAU/7AxhyArue9+6TL27StN3QVkLUMQPuAe9cOemKZpa6lqvQfYqgqQNvypyhHAVDEWQAZ82pwhYWUOwBd9eLsNehrIWndva2IPIJWTazUqJgM1LVk0OaQdIB029KGXgM1HoJ2L+x11zuQJC4AijgnvmyGWmalAzaGs4MHDj1tX+WDVybwuaHmbSC9UhP7AdKHzrgH0nlVWxkP3PNxP4W7KztYAgVAESfVQF/2MzClY7a0QJenObvMlCbe6wY3bcCKHNjejdYdGIBpoDbh3AsSG4UPCXuGUzctbMmVsGcrPs/3tpfBFUIoFCji1BqoG18BP2rjPTWjRZ07Bx05TlNgb/aAKYBEWQxLzFXqGNMmDDBwp2PuCIkKtCy3veStiU97TmkAFHFiCqed6aGnyIzNmIP8SKaWIwB2do75pm00bB1tWy+RxGCrbuzyyD1SkxhsnKcN2GuV+mhJPy/sJdQrUJH0jXUoAIo4uwaCfqZm568dzD0YdsSFdcdacnbcaJDW9sIT7+EG95L+UftU5CsxOdziWxI40P7ECRig+8bGpudkl6/xNx9xDkD9lGnoUNCxHDtC6nyBDU3qv8l3dJhGi392BFIyx7fCZui7dCMj1Nl7AGkEaXqAox3XWqLs1EDFjQYFQBHn1UA7M6FBh2PAjc2ArW10So6vjYZuZo+M0SIZnTwNJq8DtN/EMyB8k+R/iXp1D+InEErcrpv60hmA7taAK+1B2aFAESemcNv7cTT1MvPWNNPSmTWDn9I52E9hMLlVGkwNBCwpxAoP7KCjNggOrC2D6T4sO7mpN2hjYmq6mtJWgYq1EUooUMTZNdAmH/OA7IylghsptbPddGaBug4u9xP9Yf8NJHcTWPE7CcdHzeyhBljixveStkma1zoEMUD33kUIBYo4N75LcrW5SwDM+CmYtMvPrLHzD/iz1DvSZtZBkuGi/7N3Nb1xXDkQkmABAuTzI3laYG4DTbCH8f//a5vux49id0swsj1Zx1tlx1ZkZQ9rl4ssFvlq+BlO3WTCQBd7voM6hihoDfQ9mt/842MFCvtt1nFUIOI0Asl+B1QEPWtImUrzFdrsZ5N6a0HT+BqVUdZBdTVR67lDPa8drNcWaxaEwx8d/rxwCg8SS2RLoD9ce+ZLj/O5bhKIOIlA2iY6ONmZHyswpO0NFGNcl9TDAZUomP91VGigR57DVtUs4ZACAwwBb3iyQIs37aML8veF/e3u+dbjJ0mEpA8JRJypQAcZ6IOQ287rxhJvYFK6upicr0pbPMguCTbhBhRkujGtq7vxLyhRkqQTkKvPgVx/vPu5UoGI8/D6TbBtxxholWPoO4fBDZVaadcoBZr3PeYf65F/5KPTGfHZbIam1AwQnLTYSo1Ka2ICFLzxR+6Xx4itZeGm/Ta3666Z5CGBiPNMBLy0BhMawU27zVKc4Phn49ShGEVvpLhlNw3sdYqzft6jbFJLCi5AI7M5I9jjpJlEUxX0stWT2DsTIQZACZoIxJkKlFxRwZDn2Eao0UuGlVGVss40B0GwuDO8h4lZaUxCU3PKRqsqTQXHpBIaswQNNkpUPNL11KIcKtA1flj/eeNvPXEKvslmhIM6I1CzjeOLOK0jSs1R2Wxm5/+25uYDcG5UPAddgpId/EWPHEhOVzOFMB0E6esMniHNDmj98ZkEIk4iUAlNVFB9Ja6vnvpgc67iDF8GHZukNZhwUo6BKOY+F+UZKz+GapBBy5VWNN00c6IuOdEoaXU/62P381NBoDqDkP6Bl3A3Eog4T4Ha7lu/AzLQIRjuCYBpB+vY/Q5V8iQqupSLyqQOp4GTSyFZEN6AlMdWZVrpz5K8Xp4Tzi9cOiDsgXyFDis4KhBxJoGmpkCKLfM0lSXApR+tiY5rUWXXBialvQ/SaUdnabZZPoBPqPZ+B3IGsjgDbmMvn7cUIZckc/KYzYPzH9dNBYcqdGEPRJyoQIKhUchay35fIaRH/TGs7WZcVXE6wroOhdI4Aw+2dZBL+2erQqt5j4RVkAOhcBv8Y9NQoCzhrtfwrq+9iqMCESf2QFCN+ZOl/lQc2G0jCi7NLI6Cmx3Xc+C2B2jRCEqM5MEANYJxj7TE26I0uGy60mTVG6kqb63ZLH60fhPhCh4c9EAkEPEABZKq3fBMqHQlcTchL+Zo2WpD4SxIrjVELzS/uDYW1qlTMCurMamqsFqeaomkjDjoeyaTzAlm8zBpVm8ZQMhuiCYCcS6BQn00RjWZ45zTG1VYJ/Asm0KcWsfI6x+ap3R8zjOyVuvGczrWVZNpxdwUBCm8tvmzTSmyteMJ73rti3T9ZO+BNv4BFYg424XDe+14X0raAk/vcqJCG815cD98aLlwo+LWsRonFWhLqgafpBnamd7pH4pzZbJm2nC6ToC8oCsFKgGqRuhCBSLOwlutia5X2vw0js9wRmyT1mxHIrGmfeUnW5oB5tnAcU5lFrQNRjXyBc4hy64Ig6JaC0G6Cs7ydRYt0KJFGmwqBbpeewsUgWwqEHEWgf5dodC8gtDzOH5tqqkUZua2N9uGV3fTV6h1ncqJZqJUhxY7RlrTgs3OSiCXlvS6QYWmd63m8hM9UJ4RKf2pKu5fJBBxCl7ftBy4taxSt+DgXLXMS20zxgaL1cGZ7I+0Ptfst/QJIHhTaz5NaaLVmX2OQUrBswYGE9Q5RC0ZSgGaCpTyc4EY6foJKhBxlgJZbqBqS+IITFJrcbSaJPeuI7FTj2jNz6lCB1ST05WLtbqTZkMdOaiaTTBprdPVjjGQwWjIUovMTbjFxu4dUNMfRnmI8xTI/DZO8EIbb9ohHV3lKdv+abqFyMy+yWc87rmtP4+4veuenILNFlJTI6CwA/IGQkx64iPTcu1cdywJZPO7K1C61tfysT1M+sTfeuIsBaoL1TNdUKcMN4dDao87fx0tuqFAPQVD2zm0Foexrp3dzqgazsJF0HLcooTLnE6EDpwy6+RnetdqSaLFhbteagB03SwE3Ugg4iwCZQQu2pxcd6sUjUadpSkudUqqn8cRKMa2iTdY9Kk5qBpuy6X7Zk4lk8wXxM9isX86OyCb7U98Sxeucyf050IFIh7QA4WVFtSpym1EkqAO5Gg2RuJDVtctTRfBD8S706ZbBtUZkHQcNDI6GRFdPz1FRqbcrNt04cCJs8om3SxLukmg67EDxxKOOJVAmmc/UjimEE1ilOTUV0idl5Jq9TWu7PQLHwpxAjjBa40I1euIN0FzNmSrPrnm+C+58JT+lA5ZEejaDimiC7fMgV75O0+c1wNp7StAOmBklEcH+mgRLM3UmtOscWdgumC0TdMRcR0D5w10J3siJ1FwafZJ1qzuipLO6s1boB83HJ3uszx83YQ4CU82htbdNcG7HiP/aEsMOkc2NQp7brVsgOd0SneyYlNTUCJngkHGzcJlE291vHKDQWmUbVmymaWpMDsgd+GuBzns1UHgNgNxqokwhkBkbaAQaR3VmVoyVGv3O1ZItwG5jLHlvV64d7ASJ4+LQsLU67q8WuWr2hJ2W62ixlBV3WNw5hSnZhLhsxbomTd5iPMUyF+Aqx6/3kLw01MKBRxaaFlMoSxt8ji1+AYH3qTpkGDcWtp8yHugsNjCwbbqd7KCM61Iwn21sT/D7Ts7IOLMHiinPXFoV/FGFRxPdPVRXBfdnAYdEGCrJ+MElhEUrlfBRLR2tX2S6leqxI8lzv6n5qopOxY1XXzLOdD+FsJSv91eyB/iTAWCdVEPX0eMAH23CuDUBSpgg+G7PYpBgkhYx9MJKnVGZ64jKJ4I8RUFMAc03TYNowDHptn8xDTVFehyJD5//vNOC5s4t4TzsICkQTapk/42XC/U/ZhUYIG013dw9CPMiEk09Bdmd1Pn4adTrZVGMGBcLAG53TA/Ukv/wCetU4Hwmnyy6UYDgThbgXy5AGIAeY0tdq4HGAEZihMMhULELdI36MQFF8y3rqWsAItRqM0jVdn/zBxCHn3L7HWUbRV+02yJ/LLvx/aaPA0E4jEEem67PJLLpHNVZ9ReTnh0+NKVQksk9St41g0OIWrjHAjb2tykq9YYZ6Er+dl4zgSWGSwjCI4yES4bA5v8IU4mUOyxaa30QGsP6zqwFxp9j+DMEx02iUnpnOjE3oE/IDevvBlUZhgQjR6nkjlqabjFB9XzVAQh8eEEumQGLhhEA4E4XYGCDyN1B9NwWs9jwQHeJiylWC1DDSabYBhI6ghvXUWsnkgjuwOrcqU8Xqlh9K3Lj6YCbS/63q43GgjE6QTKoaZCsAbvEEBMGhQqLAHUjxwEJUNqwBM3DFyHxLdLJXzq8qArVZDrPt7eGBRusIDa9OerORANBOIBCuR/6w/pdz7cK6h8W0UJ4K0rGL3iK4sSK6QWtp0Fj+a4R7SIUlkEC4PB8Gh8ilEtz+Vqg3U3wQXox20XQLiRP8QD8PqMppu2+zd1kEAwLdCuVtdwR6QOFIQR7Xs9efW9sm4RaTNrHpuCy2YVEq34gaHfBqLTdOhjp0C36+V2o4FAnE+g93ZQF8UHXkvY5XcENyAgFBpLPdbmqHU7BII69cRCxXCkirg6KxLrc8UcM8xiK6QS3IS7lwJdsgFigod4AF4sRzbgPWM/lINTi3a/3aX2L4m7urEu6iNQUazU5lgnbDgRAQaYFSHQE2irpig4KTvt35d/+7FVoIVPLzQQiAfg7bn96cPdt6FtT6HW52zzMJzUklxd/4gAdamFWFyyzgi1+IFeMLJNihZ1Nr7WtnOJG30DbR+tg9S+ycAEAvGgGu7t+T7xZ+VTf4tnbEawuvMIwSI4Nq20NJcjYqPR9hicnILsmuSBA3ClMd6m4LdBOsd9Au1aY2a6nQIFgUB+uAJEPJBB376/vL8/L61DUKn95V6dTJ02sM0LCSBQ2dzInOjAnZA0smFqWnfdBDOkza+GmSlmevrspwURPjYzICYQiAfT6Onp7e3bQqXnRqVOJoOmBR5LEAiESnb382G5Ns1xe03r5miZATALiqapvDlFHlnviWA+NOlj9vGBOZ7FQODvMPE3Men16e3pgErBpcpz1oNXknwxeL9Uch07rlCZRly0GFI90m6rp5gDldqRlwAV4GEJxwQP8feSaH5/dVF6eT9iUl4jMAOHet7WnY+aRom2WXvLBLZCzjqT1JaOtLZzO5C83nQ8O9x/bPaBmOAh/reiFFRqrVIr7wxicBmmhlyPNodAYKCqYLdlxCDLul3Xk1HTvaNdcyBUIBoIxC9V3x21Sujflfng0mRwv01xeKNgEmjpWXFEv3Da9rqDLtwtOqAbDQTil6WS13fPyKR7G3Hilet00eqGlSo+TlLlW60wQJ6n6d3XXAoFutGAI375fumwvuslXtZvGMQBImxGo7pLt/2EAk0Nui/fsYSjgUD8c0QJrPBDUfKXgU1hUTsSpmZtDbXKtvLY2ljosHjDEm7yhwYC8c+z8JxKL/tW6b4LsWm3ohWWfvY2wc8hCUQDgfidWiXrotTt8Nz1Nowi4LbCdo3hUIXu6z7djSt0xG9KpW2rtCnAtE9J1fS/UKAPGgjE70el49TQQX2neOvNujLpF1b2JBBXgIjfvlVamHTgOtx3voB+Pflp9AkFogFH/L+Ud1DfbQy8PZcam7bN1D0U6MYED8H67v5JBO9rG2EqEA0EglQ6olJUePfjKZD3QEwgEES2Sm9H/l32SvdIIRSBuAJEENtW6ekzK/wOzdB9mQPRQCCIn3MddlS6328fNBAI4udUaa3vvq9bf0kl8ocg/gKVpii9fyN/COKvU4n/HxAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRDEf9qDQwIAAAAAQf9fu8IGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAL4qMsKa7XatAAAAAASUVORK5CYII="/>
                <div class="center-box">
                    <p style="color:white; font-size: 15px">努力匹配中...</p>
                    <a-button type="primary" @click="cancel">取消匹配</a-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import {mapMutations} from 'vuex'
    import myAxios from "@/axios/myAxios";
    import number1 from '@/assets/practice/chaimping.svg'
    import fighting from '@/assets/practice/fighting.svg'

    export default {
        name: "PK",
        data() {
            return {
                matching: false,
                empty: true,
                records: [],
                img: {
                    number1, fighting
                }
            }
        },
        mounted() {
            this.getPKRecord();
        },
        methods: {
            ...mapMutations('Exercise', ['PKExercise']),
            cancel() {
                this.matching = false;
                this.$socket.sendSock({
                    'type': 'CANCEL_MATCH'
                })
            },
            match() {
                this.matching = true;
                this.$socket.sendSock({
                    'type': 'MATCH_USER'
                }, this.getWsData)
            },
            getWsData(res) {
                if (res.code == 0) {
                    this.$message.success('匹配成功，3秒后进入游戏！');
                    setTimeout(() => {
                        this.$message.warning('答题期间请勿刷新或退出，否则自动提交！！！');

                    }, 1000);
                    console.log(res);
                    this.PKExercise(res.data.ques);
                    setTimeout(() => {
                        this.$router.push({
                                path: '/pkExercise',
                                query: {
                                    user: Number(localStorage.getItem('userId')),
                                    opponent: Number(res.data.opponent)
                                }
                            }
                        )
                    }, 3000)
                } else {
                    this.$message.info('请重新匹配！');
                }
            },
            async getPKRecord() {
                const res = await myAxios.get(`/records/pkRecords?uid=${localStorage.getItem('userId')}`);
                console.log(res);
                this.records = res.data;
            },
            timeTransform(time) {
                let minute = 0;
                while (time >= 64) {
                    time %= 64;
                    minute++;
                }
                return (minute == 0 ? '' : minute + '分') + time + '秒';
            },
            getRecord(id) {
                console.log(id)
            }
        }
    }
</script>

<style scoped>
    .img-card {
        height: 15px;
        width: 15px;
        margin-top: -3px;
        margin-right: 2px;
    }

    .popContainer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
    }

    .match {
        width: 500px;
        height: 300px;
    }

    .box {
        width: 500px;
        height: 300px;
        margin: auto auto;
    }

    .center-box {
        /*padding-left: 60px;*/
        width: 100px;
        height: 100px;
        margin: 0 auto;
    }

    .empty {
        height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-context {
        margin-top: 20px;
        background-color: white;
        height: 450px;
    }

    .img-size {
        width: 50px;
        height: 50px;
    }
    .img-size-1 {
        width: 40px;
        height: 40px;
    }
    .img-box {
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 600;
    }
</style>