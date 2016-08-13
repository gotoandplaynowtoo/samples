package exp2;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.awt.geom.Arc2D;
import java.awt.geom.Path2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class JavaPointPractice extends JFrame
{
	public static final int WIDTH = 500;
	public static final int HEIGHT = 500;

	public LinePanel panel;

	public JavaPointPractice()
	{
		panel = new LinePanel();
		add(panel);

		setTitle("Lines and Points");
		setSize(WIDTH,HEIGHT);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setVisible(true);

	}

	public static void main(String[] args)
	{
		new JavaPointPractice();
	}
}

class LinePanel extends JPanel implements Runnable,MouseMotionListener
{
	public Color bgColor = new Color(0xffffff);
	public Ball3D_2[] balls = new Ball3D_2[100];

	public double fl = 250;
	public double vpx = JavaPointPractice.WIDTH / 2;
	public double vpy = JavaPointPractice.HEIGHT / 2;

	public double mouseX;
	public double mouseY;

	public Path2D.Double line = new Path2D.Double();

	public LinePanel()
	{
		for(int i = 0; i < balls.length; i++)
		{
			balls[i] = new Ball3D_2();
			balls[i].xpos = randRange(-100,100);
			balls[i].ypos = randRange(-100,100);
			balls[i].zpos = randRange(-100,100);
		}

		addMouseMotionListener(this);
		Thread t = new Thread(this);
		t.start();

	}
	public double randRange(double min,double max)
	{
		return Math.random() * (max - min) + min;
	}

	public void mouseMoved(MouseEvent e)
	{
		mouseX = e.getX();
		mouseY = e.getY();
	}
	public void mouseDragged(MouseEvent e){}
	public void run()
	{
		while(true)
		{
			try
			{
				repaint();
				Thread.sleep(30);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
	}
	public void paint(Graphics g)
	{
		g.setColor(bgColor);
		g.fillRect(0,0,JavaPointPractice.WIDTH,JavaPointPractice.HEIGHT);
		double offSetX =0;
		double offSetY =0;
		for(int i = 0; i < balls.length; i++)
		{
			offSetX = balls[i].scaleX / 2;
			offSetY = balls[i].scaleY / 2;

			rotateY(balls[i],(mouseX - vpx) * 0.001);
			rotateX(balls[i],(mouseY - vpy) * 0.001);
			doPerspective(balls[i]);

			balls[i].x -= offSetX;
			balls[i].y -= offSetY;
			balls[i].paint(g);
		}

		Graphics2D g2 = (Graphics2D)g;

		line.reset();
		line.moveTo(balls[0].x+offSetX,balls[0].y+offSetY);
		for(int i = 1; i < balls.length; i++)
		{
			line.lineTo(balls[i].x+offSetX,balls[i].y+offSetY);
			g2.draw(line);
		}

	}

	public void doPerspective(Ball3D_2 ball)
	{
		double scale = fl / (fl + ball.zpos);
		ball.scaleX = ball.scaleY = scale * ball.scale;
		ball.x = vpx + ball.xpos * scale;
		ball.y = vpy + ball.ypos * scale;
	}

	public void rotateY(Ball3D_2 ball,double angleY)
	{
		double cosY = Math.cos(angleY);
		double sinY = Math.sin(angleY);

		double x1 = cosY * ball.xpos - sinY * ball.zpos;
		double z1 = cosY * ball.zpos + sinY * ball.xpos;

		ball.xpos = x1;
		ball.zpos = z1;
	}

	public void rotateX(Ball3D_2 ball,double angleX)
	{
		double cosX = Math.cos(angleX);
		double sinX = Math.sin(angleX);

		double y1 = cosX * ball.ypos - sinX * ball.zpos;
		double z1 = cosX * ball.zpos + sinX * ball.ypos;

		ball.ypos = y1;
		ball.zpos = z1;
	}
}

class Ball3D_2
{
	public double xpos;
	public double ypos;
	public double zpos;
	public double x = 0;
	public double y = 0;
	public double scale = 10;
	public double scaleX;
	public double scaleY;

	public Arc2D.Double ball;
	public Color color = new Color(0x000000);


	public Ball3D_2()
	{
		ball = new Arc2D.Double();
		scaleX = scaleY = scale;
	}

	public void paint(Graphics g)
	{
		Graphics2D g2 = (Graphics2D)g;

		g2.setPaint(color);
		ball.setArc(x,y,scaleX,scaleY,0,360,Arc2D.OPEN);
		g2.fill(ball);
	}

}