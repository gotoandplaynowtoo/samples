package exp3;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.awt.geom.Arc2D;
import java.util.Arrays;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class MousePractice extends JFrame
{
	public static final int WIDTH = 500;
	public static final int HEIGHT = 500;

	public MainPanel mp;
	public MousePractice()
	{
		mp = new MainPanel(this);
		add(mp);
		setTitle("Mouse Practice One");
		setSize(WIDTH,HEIGHT);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setVisible(true);
	}

	public static void main(String[] args)
	{
		new MousePractice();
	}
}

class MainPanel extends JPanel implements MouseMotionListener,Runnable
{
	public MousePractice mp;
	public Color bgColor = new Color(0x000000);

	public double vpX;
	public double vpY;
	public double focalLength = 250;

	//public Ball3D_1 ball = new Ball3D_1();
	public Ball3D_1[] ball = new Ball3D_1[50];


	public double mouseX;
	public double mouseY;

	public MainPanel(MousePractice mp)
	{
		this.mp = mp;

		vpX = mp.WIDTH / 2;
		vpY = mp.HEIGHT / 2;

		for(int i = 0; i < ball.length; i++)
		{
			ball[i] = new Ball3D_1();
			ball[i].xpos = randRange(-100,100);
			ball[i].ypos = randRange(-100,100);
			ball[i].zpos = randRange(-100,100);
			ball[i].color = new Color((int)randRange(0,255),(int)randRange(0,255),(int)randRange(0,255));

		}


		addMouseMotionListener(this);
		Thread t = new Thread(this);
		t.start();

	}

	public double randRange(double min, double max)
	{
		return (Math.random() *( max - min)) + min;
	}

	public void paint(Graphics g)
	{
		g.setColor(bgColor);
		g.fillRect(0,0,mp.WIDTH,mp.HEIGHT);
		Graphics2D g2 = (Graphics2D)g;



		for(int i = 0; i < ball.length; i++)
		{
			ball[i].paintBall(g2);

			rotateY(ball[i],(mouseX - vpX) * 0.001);
			rotateX(ball[i],(mouseY - vpY) * 0.001);

			doPerpective(ball[i]);


		}
		Arrays.sort(ball);

	}

	public void rotateX(Ball3D_1 ball,double angleX)
	{
		double cosX = Math.cos(angleX);
		double sinX = Math.sin(angleX);

		double y1 = ball.ypos * cosX - ball.zpos * sinX;
		double z1 = ball.zpos * cosX + ball.ypos * sinX;

		ball.ypos = y1;
		ball.zpos = z1;
	}

	public void rotateY(Ball3D_1 ball,double angleY)
	{
		double cosY = Math.cos(angleY);
		double sinY = Math.sin(angleY);

		double x1 = cosY * ball.xpos - sinY * ball.zpos;
		double z1 = cosY * ball.zpos + sinY * ball.xpos;

		ball.xpos = x1;
		ball.zpos = z1;

	}

	public void doPerpective(Ball3D_1 ball)
	{
		double scale = focalLength / (focalLength + ball.zpos);
		ball.scaleX = ball.scaleY = scale * ball.scale;
		ball.x = vpX + ball.xpos * scale;
		ball.y = vpY + ball.ypos * scale;
	}



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

	public void mouseMoved(MouseEvent e)
	{
		mouseX = e.getX();
		mouseY = e.getY();
	}

	public void mouseDragged(MouseEvent e){}
}

class Ball3D_1 implements Comparable
{
	public double xpos;
	public double ypos;
	public double zpos;
	public double x;
	public double y;

	public double scaleX;
	public double scaleY;
	public double scale = 20;

	public Arc2D.Double ball;
	public Color color;

	public Ball3D_1()
	{
		ball = new Arc2D.Double();
		color = new Color(0xff0000);
		scaleX = scaleY = scale;
	}

	public void paintBall(Graphics2D g)
	{
		g.setPaint(color);
		ball.setArc(x,y,scaleX,scaleY,0,360,Arc2D.OPEN);
		g.fill(ball);
	}

	public int compareTo(Object obj)
	{
		Ball3D_1 ball = (Ball3D_1)obj;
		if(ball.zpos > zpos)
		{
			return 1;
		}
		return -1;
	}
}