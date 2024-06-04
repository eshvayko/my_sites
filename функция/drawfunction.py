import turtle
import function

print('некоторые графики здесь могут быть неправильными (например y = x**(1/5))')
t = turtle.Pen()
t.hideturtle()
colors = ['red', 'blue', 'purple', 'green', 'orange', 'brown', 'black']
numberOfFunctions = 0
step = 0.1
lineWidth = 2
resolution = 40
minValueX = -10
maxValueX = 10
minValueY = -10
maxValueY = 10
lengthCellX = 600
lengthCellY = 600
xT = minValueX
y = ''
if (lengthCellX % resolution != 0) or (lengthCellY % resolution != 0):
    print('В значении переменной lengthCellX или lengthCellY поставьте число, которое без остатка делится на ',
          resolution)
# рисуем координатную прямую и клетку
function.drawcoordinate(lengthCellX, lengthCellY, resolution, minValueX, maxValueX, minValueY, maxValueY)
# рисуем линию
while y == '':
    y = turtle.textinput('График функции', 'Введите функцию y от x: y = ')
while y != '':
    numberOfFunctions += 1
    if numberOfFunctions == len(colors) + 1:
        break
    function.drawfunction(minValueX, y, maxValueX, resolution, step, lineWidth, colors[numberOfFunctions - 1])
    y = turtle.textinput('График функции',
                         'Введите еще одну функцию (макс. 7) y от x или нажмите ENTER, чтобы закончить: y = ')
turtle.done()
