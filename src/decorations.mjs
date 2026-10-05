/** Original Canvas motifs. All positions are local to the current scene. */
export const supportedArts = Object.freeze([
  'flowers', 'rings', 'balloons', 'orbit', 'stars', 'leaves', 'lanterns', 'scroll',
  'laurel', 'cap', 'peony', 'clouds', 'cake', 'toys', 'moon', 'lotus', 'table',
  'curtain', 'fireworks', 'fan',
])
const TAU = Math.PI * 2
const legacyArts = new Set(supportedArts.slice(0, 6))
function line(c, x1, y1, x2, y2) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke() }
function ellipse(c, x, y, rx, ry, angle = 0) { c.beginPath(); c.ellipse(x, y, rx, ry, angle, 0, TAU); c.fill() }
function at(c, x, y, scale, draw, angle = 0) { c.save(); c.translate(x, y); c.rotate(angle); c.scale(scale, scale); draw(); c.restore() }
function path(c, points, fill = true) {
  c.beginPath(); points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); fill ? c.fill() : c.stroke()
}
function mix(a, b, amount) {
  const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16)
  return '#' + [16, 8, 0].map(shift => Math.round(((x >> shift) & 255) * (1 - amount) + ((y >> shift) & 255) * amount).toString(16).padStart(2, '0')).join('')
}
function star(c, x, y, r, points = 4) {
  path(c, Array.from({ length: points * 2 }, (_, i) => {
    const a = i * Math.PI / points - Math.PI / 2, radius = i % 2 ? r * .32 : r
    return [x + Math.cos(a) * radius, y + Math.sin(a) * radius]
  }))
}
function leafBranch(c, x, y, angle, scale, color) {
  c.save(); c.translate(x, y); c.rotate(angle); c.scale(scale, scale); c.strokeStyle = color; c.fillStyle = color; c.lineWidth = 1.3
  c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(25, -65, -8, -130, 0, -220); c.stroke()
  for (let i = 1; i < 8; i++) { const side = i % 2 ? 1 : -1; ellipse(c, side * 16, -i * 26, 22, 8, side * .7) }
  c.restore()
}
function flower(c, x, y, r, color) {
  c.save(); c.translate(x, y); c.fillStyle = color
  for (let i = 0; i < 7; i++) { c.rotate(TAU / 7); ellipse(c, 0, -r * .45, r * .42, r * .6) }
  c.fillStyle = '#ddbd8e'; ellipse(c, 0, 0, r * .2, r * .2); c.restore()
}
function dust(c, t, w, h, s, legacy = false) {
  c.fillStyle = t.accent
  for (let i = 0; i < 38; i++) {
    const x = ((i * 337 + 53) % 1280) / 1280 * w, y = ((i * 197 + 31) % 720) / 720 * h
    if (x > w * .24 && x < w * .76 && y > h * .24 && y < h * (legacy ? .8 : .84)) continue
    c.globalAlpha = (legacy ? .2 : .12) + (i % 4) * (legacy ? .13 : .07)
    if (t.art === 'stars') {
      c.save(); c.translate(x, y); c.beginPath()
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r = (k % 2 ? 1.3 : 4) * s; c.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
      c.closePath(); c.fill(); c.restore()
    } else ellipse(c, x, y, (1 + i % 3) * s, (1 + i % 3) * s)
  }
}
// Preserve the original six designs, including their established colors and spacing.
function legacy(c, t, w, h, s) {
  c.globalAlpha = .55; c.lineWidth = s; c.strokeRect(w * .035, h * .055, w * .93, h * .89)
  if (t.art === 'flowers' || t.art === 'leaves') {
    for (const [x, y, a] of [[w * .11, h * .80, -.55], [w * .88, h * .37, 2.6]]) {
      c.globalAlpha = .60; leafBranch(c, x, y, a, s, t.art === 'leaves' ? '#6e8c71' : '#98a282')
      leafBranch(c, x + 45 * s, y, a + .65, s * .8, '#b0b499')
      if (t.art === 'flowers') { c.globalAlpha = .8; flower(c, x, y - 45 * s, 38 * s, '#c78d96'); flower(c, x + 47 * s, y - 110 * s, 23 * s, '#d6a8aa') }
    }
  } else if (t.art === 'rings' || t.art === 'orbit') {
    c.globalAlpha = .24
    for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(w / 2, h / 2, w * (.34 + i * .018), h * (.42 + i * .012), -.28, 0, TAU); c.stroke() }
    c.globalAlpha = .8; c.lineWidth = 3 * s
    for (const dx of [-16, 16]) { c.beginPath(); c.arc(w / 2 + dx * s, h * .18, 22 * s, 0, TAU); c.stroke() }
  } else if (t.art === 'balloons') {
    for (const [x, y, color] of [[.12, .24, '#dba0a8'], [.19, .32, '#ddbd82'], [.88, .21, '#aabfcc'], [.81, .30, '#c4b1ce']]) {
      c.globalAlpha = .72; c.fillStyle = color; ellipse(c, w * x, h * y, 32 * s, 42 * s)
      c.globalAlpha = .35; c.strokeStyle = t.ink; c.beginPath(); c.moveTo(w * x, h * y + 42 * s); c.bezierCurveTo(w * x - 20 * s, h * y + 110 * s, w * x + 25 * s, h * y + 150 * s, w * x, h * y + 210 * s); c.stroke()
    }
  }
  dust(c, t, w, h, s, true)
}
function frame(c, t, w, h, s) {
  c.globalAlpha = .36; c.lineWidth = s; c.strokeRect(w * .035, h * .055, w * .93, h * .89)
  c.globalAlpha = .16
  if (t.layout === 'arch') {
    c.beginPath(); c.moveTo(w * .22, h * .88); c.lineTo(w * .22, h * .29)
    c.bezierCurveTo(w * .22, h * .035, w * .78, h * .035, w * .78, h * .29); c.lineTo(w * .78, h * .88); c.stroke()
  } else if (t.layout === 'banner') {
    for (const y of [.07, .93]) { line(c, w * .09, h * y, w * .91, h * y); c.fillRect(w * .09, h * y - 3 * s, w * .065, 6 * s); c.fillRect(w * .845, h * y - 3 * s, w * .065, 6 * s) }
  } else if (t.layout === 'seal') {
    c.strokeRect(w * .047, h * .071, w * .906, h * .858)
    for (const x of [.066, .934]) for (const y of [.10, .90]) at(c, w * x, h * y, s, () => path(c, [[0, -9], [9, 0], [0, 9], [-9, 0]], false))
  } else if (t.layout === 'ribbon') {
    for (const y of [.10, .90]) { c.beginPath(); c.moveTo(w * .16, h * y); c.bezierCurveTo(w * .34, h * (y - .025), w * .66, h * (y + .025), w * .84, h * y); c.stroke() }
  }
  c.globalAlpha = 1
}
function lantern(c, t, x, y, s, tall = false) {
  at(c, x, y, s, () => {
    const ry = tall ? 65 : 49
    c.strokeStyle = t.accent; c.fillStyle = mix(t.accent, t.bg, .22); c.lineWidth = 2
    c.globalAlpha = .84; ellipse(c, 0, 0, 42, ry)
    c.strokeStyle = t.bg; c.globalAlpha = .47
    for (const rx of [12, 28, 40]) { c.beginPath(); c.ellipse(0, 0, rx, ry - 2, 0, 0, TAU); c.stroke() }
    c.globalAlpha = .9; c.fillStyle = t.accent; c.fillRect(-23, -ry - 6, 46, 8); c.fillRect(-21, ry - 2, 42, 7)
    c.strokeStyle = t.accent; line(c, 0, ry + 5, 0, ry + 23); ellipse(c, 0, ry + 25, 4, 5)
    for (let i = -3; i <= 3; i++) line(c, i * 2.5, ry + 30, i * 4, ry + 64 - Math.abs(i) * 2)
  })
}
function cloud(c, t, x, y, s, mirror = 1) {
  at(c, x, y, s, () => {
    c.scale(mirror, 1); c.strokeStyle = t.accent; c.lineWidth = 2; c.globalAlpha = .67
    c.beginPath(); c.moveTo(-72, 15); c.bezierCurveTo(-108, 15, -99, -20, -76, -16)
    c.bezierCurveTo(-88, -50, -35, -65, -22, -31); c.bezierCurveTo(-4, -47, 24, -31, 14, -11)
    c.bezierCurveTo(42, -23, 48, 15, 20, 15); c.lineTo(-61, 15); c.stroke()
    c.beginPath(); c.moveTo(-50, 5); c.bezierCurveTo(-75, 0, -52, -25, -36, -12); c.bezierCurveTo(-26, -4, -37, 6, -43, 0); c.stroke()
    line(c, -45, 25, 58, 25); line(c, -12, 34, 88, 34)
  })
}
function scroll(c, t, x, y, s, angle = 0) {
  at(c, x, y, s, () => {
    c.fillStyle = mix(t.bg, t.accent, .11); c.strokeStyle = t.accent; c.lineWidth = 1.5
    c.fillRect(-95, -32, 190, 64); c.strokeRect(-95, -32, 190, 64)
    c.fillStyle = t.accent
    for (const dx of [-96, 96]) { c.fillRect(dx - 4, -43, 8, 86); ellipse(c, dx, -43, 8, 4); ellipse(c, dx, 43, 8, 4) }
    c.globalAlpha = .4
    for (let i = 0; i < 5; i++) { const xx = -56 + i * 27; line(c, xx, -15, xx, 15 - (i % 2) * 9); line(c, xx - 4, -7, xx + 5, -7) }
  }, angle)
}
function wheat(c, t, x, y, s, angle = 0) {
  at(c, x, y, s, () => {
    c.strokeStyle = t.accent; c.fillStyle = t.accent; c.lineWidth = 1.5
    c.beginPath(); c.moveTo(0, 22); c.quadraticCurveTo(-12, -38, 0, -102); c.stroke()
    for (let i = 0; i < 6; i++) for (const side of [-1, 1]) {
      const yy = -12 - i * 13, xx = side * 9
      ellipse(c, xx, yy, 13, 5, side * .8); line(c, xx + side * 6, yy - 3, side * 26, yy - 19)
    }
    ellipse(c, 0, -98, 5, 12)
  }, angle)
}
function peony(c, t, x, y, s) {
  at(c, x, y, s, () => {
    for (let ring = 3; ring >= 0; ring--) {
      const petals = 7 + ring * 2, r = 16 + ring * 14
      c.fillStyle = mix(t.accent, t.bg, ring * .15); c.strokeStyle = mix(t.ink, t.bg, .65); c.lineWidth = .65
      for (let i = 0; i < petals; i++) at(c, 0, 0, 1, () => {
        c.beginPath(); c.moveTo(-r * .18, 9); c.bezierCurveTo(-r * .73, -r * .12, -r * .58, -r * 1.18, 0, -r)
        c.bezierCurveTo(r * .5, -r * 1.2, r * .73, -r * .17, r * .18, 9); c.closePath(); c.fill(); c.stroke()
      }, i * TAU / petals + ring * .33)
    }
    c.fillStyle = t.ink
    for (let i = 0; i < 9; i++) ellipse(c, Math.cos(i * 2.4) * 8, Math.sin(i * 2.4) * 8, 1.4, 1.4)
  })
}
function lotus(c, t, x, y, s) {
  at(c, x, y, s, () => {
    for (const a of [-1.05, 1.05, -.58, .58, 0]) at(c, 0, 0, 1, () => {
      c.fillStyle = mix(t.accent, t.bg, .35 + Math.abs(a) * .22); c.strokeStyle = t.accent; c.lineWidth = 1.2
      c.beginPath(); c.moveTo(0, 12); c.bezierCurveTo(-39, -10, -26, -44, 0, -67)
      c.bezierCurveTo(27, -40, 36, -10, 0, 12); c.fill(); c.stroke()
      c.globalAlpha = .4; line(c, 0, 8, 0, -46)
    }, a)
    c.globalAlpha = .55; c.strokeStyle = t.accent
    for (let i = 0; i < 3; i++) { c.beginPath(); c.ellipse(0, 24 + i * 9, 57 + i * 17, 4 + i * 2, 0, 0, Math.PI); c.stroke() }
  })
}
function fan(c, t, x, y, s, angle = 0) {
  at(c, x, y, s, () => {
    const begin = Math.PI * 1.1, end = Math.PI * 1.9, r = 100
    c.strokeStyle = t.accent; c.lineWidth = 1
    for (let i = 0; i < 12; i++) {
      const a = begin + (end - begin) * i / 12, b = begin + (end - begin) * (i + 1) / 12
      c.fillStyle = mix(t.accent, t.bg, i % 2 ? .65 : .79)
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, a, b); c.closePath(); c.fill(); c.stroke()
      c.globalAlpha = .32; c.beginPath(); c.arc(0, 0, r * .78, a, b); c.stroke(); c.globalAlpha = 1
    }
    c.fillStyle = t.accent; ellipse(c, 0, 0, 4, 4); line(c, 0, 0, 0, 23)
    for (let i = -2; i <= 2; i++) line(c, i * 2, 24, i * 3, 44)
  }, angle)
}
const painters = {
  lanterns(c, t, w, h, s) {
    for (const [x, y, z, tall] of [[.09, .20, 1, false], [.91, .18, 1.05, false], [.20, .10, .56, true], [.80, .09, .55, true]]) {
      c.globalAlpha = .65; line(c, w * x, h * .055, w * x, h * y - 53 * s * z); lantern(c, t, w * x, h * y, s * z, tall)
    }
    cloud(c, t, w * .09, h * .86, s * .7); cloud(c, t, w * .91, h * .86, s * .7, -1)
  },
  scroll(c, t, w, h, s) {
    scroll(c, t, w * .5, h * .155, s * .84)
    for (const [x, a] of [[.09, -.3], [.91, .3]]) {
      c.globalAlpha = .64; wheat(c, t, w * x, h * .78, s, a)
      at(c, w * x, h * .42, s, () => { c.lineWidth = 2; line(c, 0, -51, 0, 46); path(c, [[-4, 40], [4, 40], [0, 68]]); ellipse(c, 0, -48, 5, 7) }, a)
    }
  },
  laurel(c, t, w, h, s) {
    for (const [x, side] of [[.10, 1], [.90, -1]]) {
      c.globalAlpha = .75; leafBranch(c, w * x, h * .69, side * -.2, s * 1.2, t.accent)
      wheat(c, t, w * (x - side * .025), h * .75, s * .7, side * -.5)
    }
    at(c, w * .5, h * .145, s, () => {
      c.strokeStyle = t.accent; c.lineWidth = 1.2; c.beginPath(); c.arc(0, 0, 34, 0, TAU); c.stroke()
      c.fillStyle = t.accent; star(c, 0, -1, 19, 5); path(c, [[-20, 27], [-24, 55], [-9, 46], [0, 55], [-2, 31]])
      path(c, [[20, 27], [24, 55], [9, 46], [0, 55], [2, 31]])
    })
  },
  cap(c, t, w, h, s) {
    at(c, w * .5, h * .145, s, () => {
      c.fillStyle = mix(t.ink, t.bg, .15); path(c, [[-43, 0], [-43, 24], [0, 40], [43, 24], [43, 0]])
      c.fillStyle = t.accent; path(c, [[-78, -13], [0, -44], [78, -13], [0, 19]])
      c.strokeStyle = t.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -13); c.lineTo(47, 2); c.lineTo(47, 47); c.stroke()
      ellipse(c, 0, -13, 4, 3); for (let i = -2; i <= 2; i++) line(c, 47 + i, 45, 47 + i * 2.5, 66)
    })
    scroll(c, t, w * .08, h * .77, s * .55, -.45)
    for (let i = 0; i < 7; i++) { c.globalAlpha = .5; c.fillStyle = t.accent; star(c, w * (.91 + (i % 2) * .04), h * (.3 + i * .075), (4 + i % 3) * s) }
  },
  peony(c, t, w, h, s) {
    for (const [x, y, a] of [[.08, .24, -.42], [.90, .75, 2.7]]) {
      c.globalAlpha = .52; leafBranch(c, w * x, h * y + 115 * s, a, s * .9, t.accent)
      c.globalAlpha = .97; peony(c, t, w * x, h * y, s * 1.05); peony(c, t, w * x + 39 * s, h * y + 77 * s, s * .57)
    }
  },
  clouds(c, t, w, h, s) {
    for (const [x, y, z, mirror] of [[.10, .16, 1, 1], [.90, .19, 1.1, -1], [.08, .76, .83, -1], [.92, .84, .8, 1], [.49, .115, .52, 1]]) cloud(c, t, w * x, h * y, s * z, mirror)
    c.globalAlpha = .17
    for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(w * .20, h * (.90 + i * .012)); c.bezierCurveTo(w * .4, h * (.88 + i * .012), w * .6, h * (.94 + i * .012), w * .8, h * (.9 + i * .012)); c.stroke() }
  },
  cake(c, t, w, h, s) {
    at(c, w * .5, h * .15, s * .78, () => {
      c.strokeStyle = t.accent; c.lineWidth = 1.8
      for (let tier = 0; tier < 2; tier++) {
        const ww = 120 - tier * 40, yy = 26 - tier * 38
        c.fillStyle = mix(t.bg, t.accent, .18 + tier * .12); c.fillRect(-ww / 2, yy - 32, ww, 36); c.strokeRect(-ww / 2, yy - 32, ww, 36)
        c.fillStyle = t.accent
        for (let x = -ww / 2 + 7; x < ww / 2; x += 14) ellipse(c, x, yy - 30, 7, 6)
      }
      for (const x of [-23, 0, 23]) { c.fillStyle = t.ink; c.fillRect(x - 2, -64, 4, 19); c.fillStyle = t.accent; ellipse(c, x, -72, 4, 7, .2) }
      c.fillStyle = t.accent; ellipse(c, 0, 32, 73, 5); line(c, 0, 36, 0, 51); ellipse(c, 0, 53, 27, 3)
    })
    for (const [x, y] of [[.09, .38], [.91, .64]]) { c.globalAlpha = .7; c.fillStyle = t.accent; star(c, w * x, h * y, 21 * s, 5); c.globalAlpha = .3; line(c, w * x, h * y + 24 * s, w * x, h * y + 92 * s) }
  },
  toys(c, t, w, h, s) {
    c.globalAlpha = .58; c.beginPath(); c.moveTo(w * .05, h * .09); c.quadraticCurveTo(w * .5, h * .22, w * .95, h * .09); c.stroke()
    for (let i = 0; i < 11; i++) {
      const x = .07 + i * .086, y = .09 + .062 * Math.sin(i / 10 * Math.PI)
      c.fillStyle = mix(t.accent, t.ink, i % 3 * .22); path(c, [[w * x - 12 * s, h * y], [w * x + 12 * s, h * y], [w * x, h * y + 27 * s]])
    }
    at(c, w * .09, h * .84, s * .76, () => {
      c.globalAlpha = .83; c.fillStyle = t.accent; c.strokeStyle = t.ink; c.lineWidth = 3
      c.beginPath(); c.moveTo(-63, -5); c.bezierCurveTo(-76, -31, -25, -43, 13, -24); c.lineTo(30, -77); c.lineTo(50, -86); c.lineTo(76, -61); c.lineTo(57, -54); c.lineTo(43, -32); c.lineTo(38, -4); c.closePath(); c.fill()
      path(c, [[31, -76], [34, -98], [44, -85]]); path(c, [[-53, -8], [-43, 31], [-32, 31], [-32, -8]]); path(c, [[20, -8], [28, 31], [40, 31], [33, -9]])
      c.beginPath(); c.moveTo(-79, 25); c.quadraticCurveTo(0, 64, 79, 25); c.stroke(); c.fillStyle = t.ink; ellipse(c, 51, -70, 2, 2)
    })
    at(c, w * .92, h * .86, s * .73, () => {
      c.globalAlpha = .8; c.strokeStyle = t.accent; c.lineWidth = 2
      for (const [x, y, z] of [[-47, -3, .1], [0, -3, .35], [-23, -50, .6]]) {
        c.fillStyle = mix(t.accent, t.bg, z); c.fillRect(x, y, 43, 43); c.strokeRect(x, y, 43, 43); c.fillStyle = t.bg; star(c, x + 21, y + 22, 11, 5)
      }
    })
  },
  moon(c, t, w, h, s) {
    at(c, w * .11, h * .19, s, () => {
      c.fillStyle = t.accent; c.globalAlpha = .8; c.beginPath(); c.moveTo(18, -64)
      c.bezierCurveTo(-84, -76, -83, 79, 18, 64); c.bezierCurveTo(-32, 44, -43, -30, 18, -64); c.fill()
      c.globalAlpha = .25; c.beginPath(); c.arc(-8, 0, 79, -.35, 2.2); c.stroke()
    })
    c.fillStyle = t.accent
    for (const [x, y, r] of [[.86, .14, 14], [.92, .25, 7], [.80, .22, 5], [.09, .75, 9], [.92, .81, 12]]) { c.globalAlpha = .78; star(c, w * x, h * y, r * s) }
    cloud(c, t, w * .10, h * .85, s * .66); cloud(c, t, w * .91, h * .85, s * .7, -1)
  },
  lotus(c, t, w, h, s) {
    lotus(c, t, w * .09, h * .79, s); lotus(c, t, w * .91, h * .81, s * .84)
    c.globalAlpha = .48; c.fillStyle = t.accent
    for (const [x, y, a] of [[.07, .26, -.7], [.92, .34, .9]]) {
      c.beginPath(); c.ellipse(w * x, h * y, 45 * s, 16 * s, a, .3, TAU - .3); c.lineTo(w * x, h * y); c.closePath(); c.fill()
      c.beginPath(); c.moveTo(w * x, h * y); c.bezierCurveTo(w * (x + .03), h * (y + .07), w * (x - .02), h * (y + .16), w * x, h * (y + .22)); c.stroke()
    }
  },
  table(c, t, w, h, s) {
    at(c, w * .5, h * .902, s * .72, () => {
      c.fillStyle = mix(t.accent, t.bg, .72); c.strokeStyle = t.accent; c.lineWidth = 1.4
      c.beginPath(); c.moveTo(-230, -15); c.lineTo(230, -15); c.lineTo(247, 28); c.bezierCurveTo(147, 38, -147, 38, -247, 28); c.closePath(); c.fill(); c.stroke()
      c.fillStyle = mix(t.bg, t.accent, .12); ellipse(c, 0, -15, 230, 23); c.beginPath(); c.ellipse(0, -15, 230, 23, 0, 0, TAU); c.stroke()
      for (const x of [-156, -80, 80, 156]) {
        c.beginPath(); c.ellipse(x, -10, 22, 7, 0, 0, TAU); c.stroke(); line(c, x - 30, -19, x - 30, 0); line(c, x + 30, -19, x + 30, 0)
        c.beginPath(); c.moveTo(x - 8, -44); c.quadraticCurveTo(x - 8, -26, x, -26); c.quadraticCurveTo(x + 8, -26, x + 8, -44); c.closePath(); c.stroke(); line(c, x, -26, x, -17)
      }
      c.fillStyle = t.accent; path(c, [[-12, -15], [-18, -53], [18, -53], [12, -15]])
      for (let i = 0; i < 5; i++) { const x = (i - 2) * 12; line(c, 0, -44, x, -64 - i % 2 * 8); ellipse(c, x, -68 - i % 2 * 8, 8, 6) }
    })
    at(c, w * .5, h * .11, s, () => {
      c.globalAlpha = .65; line(c, 0, -42, 0, 20)
      for (const x of [-45, -23, 23, 45]) { c.beginPath(); c.moveTo(0, 3); c.quadraticCurveTo(x, 39, x, 1); c.stroke(); ellipse(c, x, -5, 3, 7); line(c, x, 20, x, 34); path(c, [[x, 33], [x + 3, 39], [x, 45], [x - 3, 39]]) }
    })
  },
  curtain(c, t, w, h, s) {
    for (const side of [-1, 1]) {
      c.save(); if (side === 1) { c.translate(w, 0); c.scale(-1, 1) }
      c.fillStyle = mix(t.accent, t.bg, .75); c.strokeStyle = t.accent; c.lineWidth = s
      c.beginPath(); c.moveTo(0, 0); c.lineTo(w * .22, 0); c.bezierCurveTo(w * .22, h * .25, w * .10, h * .46, w * .145, h * .63); c.lineTo(w * .18, h); c.lineTo(0, h); c.closePath(); c.fill()
      c.globalAlpha = .24
      for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(w * (.025 + i * .026), 0); c.bezierCurveTo(w * (.025 + i * .025), h * .31, w * (.06 + i * .014), h * .44, w * (.08 + i * .009), h * .63); c.lineTo(w * (.09 + i * .015), h); c.stroke() }
      c.globalAlpha = .7; line(c, w * .08, h * .635, w * .146, h * .618); line(c, w * .135, h * .63, w * .155, h * .72); c.fillStyle = t.accent; ellipse(c, w * .156, h * .73, 4 * s, 12 * s); c.restore()
    }
    c.globalAlpha = .2; c.fillStyle = t.accent
    c.beginPath(); c.moveTo(0, 0); c.lineTo(w, 0); c.lineTo(w, h * .06); c.bezierCurveTo(w * .8, h * .20, w * .65, h * .14, w * .5, h * .065); c.bezierCurveTo(w * .35, h * .14, w * .2, h * .20, 0, h * .06); c.closePath(); c.fill()
  },
  fireworks(c, t, w, h, s) {
    for (const [x, y, r, count] of [[.09, .19, 91, 22], [.92, .22, 76, 19], [.52, .11, 42, 16], [.92, .79, 55, 17]]) at(c, w * x, h * y, s, () => {
      c.strokeStyle = t.accent; c.fillStyle = t.accent; c.lineWidth = 1.5
      for (let i = 0; i < count; i++) {
        const a = i * TAU / count, outer = r * (.81 + i % 3 * .09)
        c.globalAlpha = .65; line(c, Math.cos(a) * r * .25, Math.sin(a) * r * .25, Math.cos(a) * outer, Math.sin(a) * outer)
        c.globalAlpha = .38; ellipse(c, Math.cos(a) * (outer + 9), Math.sin(a) * (outer + 9), 2, 2)
      }
      c.globalAlpha = .78; star(c, 0, 0, 8)
    })
  },
  fan(c, t, w, h, s) {
    fan(c, t, w * .09, h * .31, s * 1.04, .5); fan(c, t, w * .93, h * .77, s * .95, -.4)
    fan(c, t, w * .51, h * .185, s * .48)
    c.globalAlpha = .43; leafBranch(c, w * .09, h * .87, -.18, s * .68, t.accent)
  },
}
/** Draw one of supportedArts without changing the caller's drawing state. */
export function drawDecorations(c, t, w, h) {
  const s = Math.min(w / 1280, h / 720)
  c.save(); c.strokeStyle = t.accent; c.fillStyle = t.accent; c.lineWidth = s
  if (legacyArts.has(t.art)) legacy(c, t, w, h, s)
  else {
    c.lineCap = 'round'; c.lineJoin = 'round'
    frame(c, t, w, h, s)
    // Preserve a quiet central text area in every portrait and landscape layout.
    c.save(); c.beginPath(); c.rect(0, 0, w, h); c.rect(w * .24, h * .24, w * .52, h * .60); c.clip('evenodd')
    painters[t.art]?.(c, t, w, h, s); c.restore(); dust(c, t, w, h, s)
  }
  c.restore()
}
