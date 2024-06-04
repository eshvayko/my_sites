import turtle
import math

t = turtle.Pen()
t.speed(0)
t.hideturtle()


def drawfunction(xFrom, yT, xTo, res, stp, lineWidth, color):
    x = xFrom
    t.penup()
    t.goto(0, 0)
    t.pencolor(color)
    t.pendown()
    t.penup()
    t.width(lineWidth)
    firstPoint = True
    while x <= xTo:
        z = eval(yT)
        z = z.real  # я очень долго разбирался как из 1.2313423141234+2j сделать нормальное число
        print('y =', yT, '=', z, '; x =', x)
        t.goto(x * res, z * res)
        if firstPoint:
            t.pendown()
        firstPoint = False
        x = x + stp
    print('y =', yT)


def drawcoordinate(lcx, lcy, res, mvx, xvx, mvy, xvy):
    t.penup()
    t.pencolor('lightgray')
    i = lcx
    while -i <= lcx:
        t.goto(-i, -lcy)
        t.pendown()
        t.goto(-i, lcy)
        t.penup()
        i -= res
    i = lcy
    while -i <= lcy:
        t.goto(-lcx, -i)
        t.pendown()
        t.goto(lcx, -i)
        t.penup()
        i -= res
    t.pencolor('black')
    t.penup()
    t.goto(mvx * res, 0)
    t.pendown()
    t.goto(xvx * res, 0)
    t.penup()
    t.goto(0, mvy * res)
    t.pendown()
    t.goto(0, xvy * res)
    t.penup()
    t.goto(0, 0)
    t.pendown()

    currentPoint = mvy
    while currentPoint <= xvy:
        t.goto(0, currentPoint * res)
        t.circle(2)
        t.write(currentPoint, font=('Arial', int(20 * res / 40), 'bold'))
        currentPoint = currentPoint + 1
    currentPoint = mvx
    t.goto(0, 0)

    while currentPoint <= xvx:
        t.goto(currentPoint * res, 0)
        t.circle(2)
        t.write(currentPoint, font=('Arial', int(20 * res / 40), 'bold'))
        currentPoint = currentPoint + 1
    t.goto(0, 0)
