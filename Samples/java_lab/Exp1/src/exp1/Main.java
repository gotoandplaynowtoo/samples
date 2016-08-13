package exp1;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.geom.Arc2D;
import java.util.Arrays;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main extends JFrame
{
	public int width = 500;
	public int height = 500;
	public MainPanel panel;


	public Main()
	{

		panel = new MainPanel(this);
		add(panel);
		setTitle("Experiment1");
		setSize(width,height);
		setResizable(false);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setVisible(true);
	}

	public static void main(String[] args)
	{
		new Main();
	}
}

class MainPanel extends JPanel implements Runnable
{
	public Main m;
	public Color bgColor = new Color(0x000000);
	public Rectangle.Double bg;

	public double vpx;
	public double vpy;
	public double fl = 250;
	public double floor = 200;

	public Ball3D[] ball = new Ball3D[100];

	public double angle = 0;

	public MainPanel(Main m)
	{
		this.m = m;

		vpx = m.width / 2;
		vpy = m.height / 2;

		for(int i = 0; i < ball.length; i++)
		{
			ball[i] = new Ball3D();

			ball[i].zpos = 1000;
			ball[i].xpos = 0;
			ball[i].ypos = -800;
			ball[i].vx = randRange(-20,20);
			ball[i].vy = randRange(-20,20);
			ball[i].vz = randRange(-20,20);

			ball[i].color = new Color((int)randRange(0,255),(int)randRange(0,255),(int)randRange(0,255));

		}


		bg = new Rectangle.Double(0,0,m.width,m.height);
		Thread t = new Thread(this);
		t.start();
	}

	public void paint(Graphics g)
	{
		Graphics2D g2 = (Graphics2D)g;
		g2.setPaint(bgColor);
		g2.fill(bg);

		Arrays.sort(ball);
		for(int i = 0; i < ball.length; i++)
		{

			ball[i].paintBall(g2);
			updateBall(ball[i]);
		}

	}

	public void updateBall(Ball3D ball)
	{

		ball.vx *= ball.drag;
		ball.vy *= ball.drag;
		ball.vz *= ball.drag;

		ball.vy += ball.gravity;


		ball.xpos += ball.vx;
		ball.ypos += ball.vy;
		ball.zpos += ball.vz;

		if(ball.ypos > floor)
		{
			ball.ypos = floor;
			ball.vy *= ball.bounce;
		}


		double scale = fl / (fl + ball.zpos);
		ball.scaleX = ball.scaleY = ball.scale * scale;
		ball.x = vpx + ball.xpos * scale;
		ball.y = vpy + ball.ypos * scale;


	}



	public double randRange(double min, double max)
	{
		return (Math.random() *( max - min)) + min;
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
}

class Ball3D implements Comparable
{

	public double xpos;
	public double ypos;
	public double zpos;

	public double x;
	public double y;

	public double vx;
	public double vy;
	public double vz;

	public double scale = 20;
	public double scaleX;
	public double scaleY;

	public double gravity = 0.8;
	public double drag = 0.99;
	public double bounce = -0.5;

	public Color color;
	public Arc2D.Double ball;

	public Ball3D()
	{
		color = new Color(0xff0000);
		scaleX = scaleY = scale;
		ball = new Arc2D.Double();
	}

	public void paintBall(Graphics2D g2)
	{
		g2.setPaint(color);
		ball.setArc(x,y,scaleX,scaleY,0,360,Arc2D.OPEN);
		g2.fill(ball);
	}

	public int compareTo(Object obj)
	{
		Ball3D ball = (Ball3D)obj;
		if(ball.zpos > zpos)
		{
			return 1;
		}
		return 0;
	}
}