import pygame
import random
pygame.init()
print()
print('Красиво :)')

width = 1000
height = 1000
screen = pygame.display.set_mode([width, height])
pygame.display.set_caption('Залипайте')

keep_going = True
isRadiusChanged = False
r = 255
g = 0
b = 0
color = (r, g, b)
x = width / 2
y = height / 2
radius = 20
fps = 200
speedx = random.randint(5, 10) * random.choice([-1, 1])
speedy = random.randint(5, 10) * random.choice([-1, 1])
changeRadius = 7
timer = pygame.time.Clock()

def changeColor():
    global r, g, b
    if r == 255 and b == 0 and g < 255:
        g += 1
    elif g == 255 and b == 0 and r > 0:
        r -= 1
    elif g == 255 and r == 0 and b < 255:
        b += 1
    elif b == 255 and r == 0 and g > 0:
        g -= 1
    elif g == 0 and b == 255 and r < 255:
        r += 1
    elif r == 255 and g == 0 and b > 0:
        b -= 1
    changedcolor = (r, g, b)
    return changedcolor

while keep_going:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            keep_going = False
    screen.fill((0, 0, 0))
    isRadiusChanged = False
    x += speedx / fps * 60
    y += speedy / fps * 60
    if x - radius <= 0 or x + radius >= width:
        if x - radius <= 0:
            x = radius + changeRadius
        if x + radius >= width:
            x = width - radius - changeRadius
        speedx = -speedx
        radius += changeRadius
        isRadiusChanged = True
    if isRadiusChanged:
        radius -= changeRadius
    if y - radius <= 0 or y + radius >= height:
        if y - radius <= 0:
            y = radius + changeRadius
        if y + radius >= height:
            y = height - radius - changeRadius
        speedy = -speedy
        radius += changeRadius
    if radius >= height / 2 or radius >= width / 2:
        keep_going = False
    pygame.draw.circle(screen, changeColor(), (x, y), radius)
    pygame.display.update()
    timer.tick(fps)
pygame.quit()
